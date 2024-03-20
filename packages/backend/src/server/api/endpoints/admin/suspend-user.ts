import define from '../../define.js';
import deleteFollowing from '@/services/following/delete.js';
import { Users, Followings, Notifications } from '@/models/index.js';
import { User } from '@/models/entities/user.js';
import { insertModerationLog } from '@/services/insert-moderation-log.js';
import { doPostSuspend } from '@/services/suspend-user.js';
import { publishUserEvent } from '@/services/stream.js';
import { Not, IsNull } from 'typeorm';

export const meta = {
	tags: ['admin'],

	requireCredential: true,
	requireModerator: true,
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		userId: { type: 'string', format: 'misskey:id' },
	},
	required: ['userId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, me) => {
	const user = await Users.findOneBy({ id: ps.userId });

	if (user == null) {
		throw new Error('user not found');
	}

	if (user.isAdmin) {
		throw new Error('cannot suspend admin');
	}

	if (user.isModerator) {
		throw new Error('cannot suspend moderator');
	}

	await Users.update(user.id, {
		isSuspended: true,
	});

	insertModerationLog(me, 'suspend', {
		targetId: user.id,
	});

	// Terminate streaming
	if (Users.isLocalUser(user)) {
		publishUserEvent(user.id, 'terminate', {});
	}

	(async () => {
		await removeLocalToRemoteFollowAll(user).catch(e => {});
		await removeRemoteToLocalFollowAll(user).catch(e => {});
		await doPostSuspend(user).catch(e => {});
		await unFollowAll(user).catch(e => {});
		await readAllNotify(user).catch(e => {});
	})();
});

async function unFollowAll(follower: User) {
	// Follow Direction: Remote Susupended User to Local Follower

	// When suspending a remote account, the account obviously doesn't
	// actually become suspended on its origin server, i.e. unlike a
	// locally suspended account it continues to have access to its home
	// feed and other content. To prevent it from being able to continue
	// to access toots it would receive because it follows local accounts,
	// we have to force it to unfollow them. Unfortunately, there is no
	// counterpart to this operation, i.e. you can't then force a remote
	// account to re-follow you, so this part is not reversible.
	if (follower.host == null) return;
	const followings = await Followings.findBy({
		followerId: follower.id,
	});

	for (const following of followings) {
		const followee = await Users.findOneBy({
			id: following.followeeId,
		});

		if (followee == null) {
			throw `Cant find followee ${following.followeeId}`;
		}

		await deleteFollowing(follower, followee, true);
	}
}

async function removeLocalToRemoteFollowAll(follower: User) {
	// Follow Direction: Local Susupended User to Remote Follower

	// Local Suspended User is deleted on Remote, so Follow Relationships must be deleted.
	// This part is not reversible.
	if (follower.host != null) return;
	const followings = await Followings.findBy({
		followerId: follower.id,
		followeeHost: Not(IsNull()),
	});

	for (const following of followings) {
		const followee = await Users.findOneBy({
			id: following.followeeId,
		});

		if (followee == null) {
			throw `Cant find followee ${following.followeeId}`;
		}

		await deleteFollowing(follower, followee, true);
	}
}

async function removeRemoteToLocalFollowAll(followee: User) {
	// Follow Direction: Remote Follower to Local Susupended User

	// Local Suspended User is deleted on Remote, so Follow Relationships must be deleted.
	// This part is not reversible.
	if (followee.host != null) return;
	const followings = await Followings.findBy({
		followeeId: followee.id,
		followerHost: Not(IsNull()),
	});

	for (const following of followings) {
		const follower = await Users.findOneBy({
			id: following.followerId,
		});

		if (follower == null) {
			throw `Cant find follower ${following.followerId}`;
		}

		await deleteFollowing(follower, followee, true);
	}
}

async function readAllNotify(notifier: User) {
	await Notifications.update({
		notifierId: notifier.id,
		isRead: false,
	}, {
		isRead: true,
	});
}
