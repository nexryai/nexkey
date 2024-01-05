import { Note } from '@/models/entities/note.js';
import { publishMainStream } from '@/services/stream.js';
import { User } from '@/models/entities/user.js';
import { Mutings, NoteThreadMutings, NoteUnreads, UserProfiles } from '@/models/index.js';
import { genId } from '@/misc/gen-id.js';

export async function insertNoteUnread(userId: User['id'], note: Note, params: {
	// NOTE: isSpecifiedがtrueならisMentionedは必ずfalse
	isSpecified: boolean;
	isMentioned: boolean;
}) {
	//#region ミュートしているなら無視
	// TODO: 現在の仕様ではChannelにミュートは適用されないのでよしなにケアする
	const mute = await Mutings.findBy({
		muterId: userId,
	});
	if (mute.map(m => m.muteeId).includes(note.userId)) return;
	if (note.userHost != null) {
		const pushedUserProfile = await UserProfiles.findOneBy({
			userId: userId,
		});
		if (pushedUserProfile.mutedInstances.includes(note.userHost)) {
			return;
		}
	}
	//#endregion

	// スレッドミュート
	const threadMute = await NoteThreadMutings.findOneBy({
		userId: userId,
		threadId: note.threadId || note.id,
	});
	if (threadMute) return;

	const unread = {
		id: genId(),
		noteId: note.id,
		userId: userId,
		isSpecified: params.isSpecified,
		isMentioned: params.isMentioned,
		noteChannelId: note.channelId,
		noteUserId: note.userId,
	};

	await NoteUnreads.insert(unread);

	// 2秒経っても既読にならなかったら「未読の投稿がありますよ」イベントを発行する
	setTimeout(async () => {
		const exist = await NoteUnreads.findOneBy({ id: unread.id });

		if (exist == null) return;

		if (params.isMentioned) {
			publishMainStream(userId, 'unreadMention', note.id);
		}
		if (params.isSpecified) {
			publishMainStream(userId, 'unreadSpecifiedNote', note.id);
		}
		if (note.channelId) {
			publishMainStream(userId, 'unreadChannel', note.id);
		}
	}, 2000);
}
