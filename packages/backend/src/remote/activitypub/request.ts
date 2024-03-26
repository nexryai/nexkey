import config from '@/config/index.js';
import { getUserKeypair } from '@/misc/keypair-store.js';
import { User, ILocalUser } from '@/models/entities/user.js';
import { StatusError, getResponse } from '@/misc/fetch.js';
import { createSignedPost, createSignedGet } from './ap-request.js';
import type { Response } from 'node-fetch';
import { IObject } from './type.js';
import { isValidUrl } from '@/misc/is-valid-url.js';
import { apLogger } from '@/remote/activitypub/logger.js';

export default async (user: { id: User['id'] }, url: string, object: any) => {
	const body = JSON.stringify(object);

	const keypair = await getUserKeypair(user.id);

	const req = createSignedPost({
		key: {
			privateKeyPem: keypair.privateKey,
			keyId: `${config.url}/users/${user.id}#main-key`,
		},
		url,
		body,
		additionalHeaders: {
			'User-Agent': config.userAgent,
		},
	});

	await getResponse({
		url,
		method: req.request.method,
		headers: req.request.headers,
		body,
	});
};

/**
 * Get ActivityPub object
 * @param url URL to fetch
 * @param user http-signature user
 * @param redirects whether or not to accept redirects
 */
export async function apGet(
	url: string,
	user?: ILocalUser,
	redirects: boolean = true,
): Promise<{ finalUrl: string; content: IObject }> {
	if (!isValidUrl(url)) {
		throw new StatusError('Invalid URL', 400);
	}

	let res: Response;
	
	if (user != null) {
		const keypair = await getUserKeypair(user.id);
		const req = createSignedGet({
			key: {
				privateKeyPem: keypair.privateKey,
				keyId: `${config.url}/users/${user.id}#main-key`,
			},
			url,
			additionalHeaders: {
				"User-Agent": config.userAgent,
			},
		});

		res = await getResponse({
			url,
			method: req.request.method,
			headers: req.request.headers,
			redirect: redirects ? 'manual' : 'error',
		});

		if (redirects && [301, 302, 307, 308].includes(res.status)) {
			const newUrl = res.headers.get('location');
			if (newUrl == null) throw new Error('apGet got redirect but no target location');
			apLogger.debug(`apGet is redirecting to ${newUrl}`);
			return apGet(newUrl, user, false);
		}
	} else {
		res = await getResponse({
			url,
			method: "GET",
			headers: {
				Accept:
					'application/activity+json, application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
				"User-Agent": config.userAgent,
			},
			redirect: redirects ? 'manual' : 'error',
		});

		if (redirects && [301, 302, 307, 308].includes(res.status)) {
			const newUrl = res.headers.get('location');
			if (newUrl == null) throw new Error('apGet got redirect but no target location');
			apLogger.debug(`apGet is redirecting to ${newUrl}`);
			return apGet(newUrl, undefined, false);
		}
	}

	const contentType = res.headers.get("content-type");
	if (contentType == null || !validateContentType(contentType)) {
		throw new Error(`apGet response had unexpected content-type: ${contentType}`);
	}

	if (res.body == null) throw new Error("body is null");

	const text = await res.text();
	if (text.length > 65536) throw new Error("too big result");

	return {
		finalUrl: res.url,
		content: JSON.parse(text) as IObject,
	};
}

function validateContentType(contentType: string): boolean {
	const parts = contentType.split(/\s*;\s*/);
	if (parts[0] === "application/activity+json") return true;
	if (parts[0] !== "application/ld+json") return false;
	return parts
		.slice(1)
		.some(
			(part) =>
				part.trim() === 'profile="https://www.w3.org/ns/activitystreams"',
		);
}
