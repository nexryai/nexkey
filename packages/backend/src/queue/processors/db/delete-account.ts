import Bull from 'bull';
import { queueLogger } from '../../logger.js';
import { AccessTokens, DriveFiles, Notes, UserProfiles, Users, UserNotePinings, MessagingMessages, Followings, Mutings, Blockings, Notifications, FollowRequests, Antennas, NoteReactions, Clips } from '@/models/index.js';
import { DbUserDeleteJobData } from '@/queue/types.js';
import { Note } from '@/models/entities/note.js';
import { DriveFile } from '@/models/entities/drive-file.js';
import { MoreThan } from 'typeorm';
import { deleteFileSync } from '@/services/drive/delete-file.js';
import { sendEmail } from '@/services/send-email.js';
import { emailDeliver } from '@/queue/index.js';

const logger = queueLogger.createSubLogger('delete-account');

export async function deleteAccount(job: Bull.Job<DbUserDeleteJobData>): Promise<string | void> {
	logger.info(`Deleting account of ${job.data.user.id} ...`);

	const user = await Users.findOneBy({ id: job.data.user.id });
	if (user == null) {
		return;
	}

	{ // Delete notes
		const notesCount = await Notes.createQueryBuilder('note')
    .where('note.userId = :userId', { userId: job.data.user.id })
    .getCount();

		while (true) {
			const notes = await Notes.find({
				where: {
					userId: user.id,
				},
				take: 50,
			}) as Note[];

			if (notes.length === 0) {
				break;
			}

			await Notes.delete(notes.map(note => note.id));

			let currentNotesCount = await Notes.createQueryBuilder('note')
			.where('note.userId = :userId', { userId: job.data.user.id })
			.getCount();

			let deleteprogress = currentNotesCount === 0 ? 99 : Math.floor(100 - (currentNotesCount / notesCount) * 100);

			job.progress(deleteprogress);
		}

		logger.succ(`All of notes deleted`);
	}

	{ // Delete files
		while (true) {
			const files = await DriveFiles.find({
				where: {
					userId: user.id,
				},
				take: 10,
			}) as DriveFile[];

			if (files.length === 0) {
				break;
			}

			for (const file of files) {
				await deleteFileSync(file);
			}
		}

		logger.succ(`All of files deleted`);
	}

	{ // Send email notification
		const profile = await UserProfiles.findOneByOrFail({ userId: user.id });
		if (profile.email && profile.emailVerified) {
			emailDeliver(profile.email, 'Account deleted',
				`Your account has been deleted.`,
				`Your account has been deleted.`);
		}
	}

	// soft指定されている場合は物理削除しない
	if (job.data.soft) {
		// nop
		await MessagingMessages.delete({
			userId: job.data.user.id,
		});
	} else {
		if (Users.isLocalUser(job.data.user)) {
			await UserProfiles.update(job.data.user.id, {
				description: null,
				email: null,
				emailVerifyCode: null,
				emailVerified: false,
				password: null,
				twoFactorSecret: null,
				twoFactorTempSecret: null,
				twoFactorEnabled: false,
				location: null,
				birthday: null,
				description: null,
				fields: [],
				clientData: {},
				integrations: {},
			});
			await Users.update(job.data.user.id, {
				isDeleted: true,
				isSuspended: true,
				name: null,
				followersCount: 0,
				followingCount: 0,
				notesCount: 0,
				avatarId: null,
				bannerId: null,
			});
			await UserNotePinings.delete({
				userId: job.data.user.id,
			});
			await AccessTokens.delete({
				userId: job.data.user.id,
			});
			await MessagingMessages.delete({
				userId: job.data.user.id,
			});
			await Followings.delete({
				followerId: job.data.user.id,
			});
			await Followings.delete({
				followeeId: job.data.user.id,
			});
			await Mutings.delete({
				muteeId: job.data.user.id,
			});
			await Mutings.delete({
				muterId: job.data.user.id,
			});
			await Blockings.delete({
				blockeeId: job.data.user.id,
			});
			await Blockings.delete({
				blockerId: job.data.user.id,
			});
			await Notifications.delete({
				notifierId: job.data.user.id,
			});
			await Notifications.delete({
				notifieeId: job.data.user.id,
			});
			await FollowRequests.delete({
				followerId: job.data.user.id,
			});
			await FollowRequests.delete({
				followeeId: job.data.user.id,
			});
			await Antennas.delete({
				userId: job.data.user.id,
			});
			await NoteReactions.delete({
				userId: job.data.user.id,
			});
			await Clips.delete({
				userId: job.data.user.id,
			});
		} else {
			await Users.delete(job.data.user.id);
		}
	}

	return 'Account deleted';
}
