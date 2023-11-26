import Router from "@koa/router";
import json from "koa-json-body";
import httpSignature from "@peertube/http-signature";

import * as crypto from 'node:crypto';
import { In, IsNull, Not } from "typeorm";
import config from "@/config/index.js";
import { renderActivity } from "@/remote/activitypub/renderer/index.js";
import renderNote from "@/remote/activitypub/renderer/note.js";
import renderKey from "@/remote/activitypub/renderer/key.js";
import { renderPerson } from "@/remote/activitypub/renderer/person.js";
import renderEmoji from "@/remote/activitypub/renderer/emoji.js";
import { inbox as processInbox } from "@/queue/index.js";
import { isSelfHost } from "@/misc/convert-host.js";
import { Notes, Users, Emojis, NoteReactions } from "@/models/index.js";
import { ILocalUser, User } from "@/models/entities/user.js";
import { renderLike } from "@/remote/activitypub/renderer/like.js";
import { getUserKeypair } from "@/misc/keypair-store.js";
import renderFollow from "@/remote/activitypub/renderer/follow.js";
import Featured from "./activitypub/featured.js";
import Following from "./activitypub/following.js";
import Followers from "./activitypub/followers.js";
import Outbox, { packActivity } from "./activitypub/outbox.js";

// Init router
const router = new Router();

//#region Routing

function inbox(ctx: Router.RouterContext) {
	let signature;

	try {
		signature = httpSignature.parseRequest(ctx.req, { "headers": [] });
	} catch (e) {
		ctx.status = 401;
		return;
	}

	if (signature.params.headers.indexOf("host") === -1
		|| ctx.headers.host !== config.host) {
		// Host not specified or not match.
		console.log("Host not specified or not match.")
		ctx.status = 401;
		return;
	}

	if (signature.params.headers.indexOf("digest") === -1) {
		console.log("Digest not found.")
		// Digest not found.
		ctx.status = 401;
	} else {
		const digest = ctx.headers.digest;

		if (typeof digest !== "string") {
			// Huh?
			console.log("Not string")
			ctx.status = 401;
			return;
		}

		const re = /^([a-zA-Z0-9\-]+)=(.+)$/;
		const match = digest.match(re);

		if (match == null) {
			// Invalid digest
			console.log("No digest")
			ctx.status = 401;
			return;
		}

		const algo = match[1];
		const digestValue = match[2];

		if (algo !== "SHA-256") {
			// Unsupported digest algorithm
			console.log("Unsupported digest algorithm")
			ctx.status = 401;
			return;
		}

		if (ctx.request.rawBody == null) {
			// Bad request
			console.log("RawBody is Null")
			ctx.status = 400;
			return;
		}

		const hash = crypto.createHash("sha256").update(ctx.request.rawBody).digest("base64");

		if (hash !== digestValue) {
			// Invalid digest
			console.log("Invalid digest")
			ctx.status = 401;
			return;
		}
	}

	processInbox(ctx.request.body, signature);

	ctx.status = 202;
}

const ACTIVITY_JSON = "application/activity+json; charset=utf-8";
const LD_JSON = "application/ld+json; profile=\"https://www.w3.org/ns/activitystreams\"; charset=utf-8";

function isActivityPubReq(ctx: Router.RouterContext) {
	ctx.response.vary("Accept");
	const accepted = ctx.accepts("html", ACTIVITY_JSON, LD_JSON);
	return typeof accepted === "string" && !accepted.match(/html/);
}

export function setResponseType(ctx: Router.RouterContext) {
	const accept = ctx.accepts(ACTIVITY_JSON, LD_JSON);
	if (accept === LD_JSON) {
		ctx.response.type = LD_JSON;
	} else {
		ctx.response.type = ACTIVITY_JSON;
	}
}

// inbox
router.post("/inbox", json(), inbox);
router.post("/users/:user/inbox", json(), inbox);

// note
router.get("/notes/:note", async (ctx, next) => {
	if (!isActivityPubReq(ctx)) return await next();

	const note = await Notes.findOneBy({
		id: ctx.params.note,
		visibility: In(["public" as const, "home" as const]),
		localOnly: false,
	});

	if (note == null) {
		ctx.status = 404;
		return;
	}

	// リモートだったらリダイレクト
	if (note.userHost != null) {
		if (note.uri == null || isSelfHost(note.userHost)) {
			ctx.status = 500;
			return;
		}
		ctx.redirect(note.uri);
		return;
	}

	ctx.body = renderActivity(await renderNote(note, false));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
});

// note activity
router.get("/notes/:note/activity", async ctx => {
	const note = await Notes.findOneBy({
		id: ctx.params.note,
		userHost: IsNull(),
		visibility: In(["public" as const, "home" as const]),
		localOnly: false,
	});

	if (note == null) {
		ctx.status = 404;
		return;
	}

	ctx.body = renderActivity(await packActivity(note));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
});

// outbox
router.get("/users/:user/outbox", Outbox);

// followers
router.get("/users/:user/followers", Followers);

// following
router.get("/users/:user/following", Following);

// featured
router.get("/users/:user/collections/featured", Featured);

// publickey
router.get("/users/:user/publickey", async ctx => {
	const userId = ctx.params.user;

	const user = await Users.findOneBy({
		id: userId,
		host: IsNull(),
	});

	if (user == null) {
		ctx.status = 404;
		return;
	}

	const keypair = await getUserKeypair(user.id);

	if (Users.isLocalUser(user)) {
		ctx.body = renderActivity(renderKey(user, keypair));
		ctx.set("Cache-Control", "public, max-age=180");
		setResponseType(ctx);
	} else {
		ctx.status = 400;
	}
});

// user
async function userInfo(ctx: Router.RouterContext, user: User | null) {
	if (user == null) {
		ctx.status = 404;
		return;
	}

	ctx.body = renderActivity(await renderPerson(user as ILocalUser));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
}

router.get("/users/:user", async (ctx, next) => {
	if (!isActivityPubReq(ctx)) return await next();

	const userId = ctx.params.user;

	const user = await Users.findOneBy({
		id: userId,
		host: IsNull(),
		isSuspended: false,
	});

	await userInfo(ctx, user);
});

router.get("/@:user", async (ctx, next) => {
	if (!isActivityPubReq(ctx)) return await next();

	const user = await Users.findOneBy({
		usernameLower: ctx.params.user.toLowerCase(),
		host: IsNull(),
		isSuspended: false,
	});

	await userInfo(ctx, user);
});
//#endregion

// emoji
router.get("/emojis/:emoji", async ctx => {
	const emoji = await Emojis.findOneBy({
		host: IsNull(),
		name: ctx.params.emoji,
	});

	if (emoji == null) {
		ctx.status = 404;
		return;
	}

	ctx.body = renderActivity(await renderEmoji(emoji));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
});

// like
router.get("/likes/:like", async ctx => {
	const reaction = await NoteReactions.findOneBy({ id: ctx.params.like });

	if (reaction == null) {
		ctx.status = 404;
		return;
	}

	const note = await Notes.findOneBy({ id: reaction.noteId });

	if (note == null) {
		ctx.status = 404;
		return;
	}

	ctx.body = renderActivity(await renderLike(reaction, note));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
});

// follow
router.get("/follows/:follower/:followee", async ctx => {
	// This may be used before the follow is completed, so we do not
	// check if the following exists.

	const [follower, followee] = await Promise.all([
		Users.findOneBy({
			id: ctx.params.follower,
			host: IsNull(),
		}),
		Users.findOneBy({
			id: ctx.params.followee,
			host: Not(IsNull()),
		}),
	]);

	if (follower == null || followee == null) {
		ctx.status = 404;
		return;
	}

	ctx.body = renderActivity(renderFollow(follower, followee));
	ctx.set("Cache-Control", "public, max-age=180");
	setResponseType(ctx);
});

export default router;
