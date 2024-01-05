import { Antenna } from '@/models/entities/antenna.js';
import { Note } from '@/models/entities/note.js';
import { AntennaNotes, Mutings, Notes, UserProfiles } from '@/models/index.js';
import { genId } from '@/misc/gen-id.js';
import { isUserRelated } from '@/misc/is-user-related.js';
import { publishAntennaStream, publishMainStream } from '@/services/stream.js';
import { User } from '@/models/entities/user.js';

export async function addNoteToAntenna(antenna: Antenna, note: Note, noteUser: { id: User['id']; }) {
	// 通知しない設定になっているか、自分自身の投稿なら既読にする
	const read = !antenna.notify || (antenna.userId === noteUser.id);

	const newAntennaNoteId = genId();

	AntennaNotes.insert({
		id: newAntennaNoteId,
		antennaId: antenna.id,
		noteId: note.id,
		read: read,
	});

	publishAntennaStream(antenna.id, 'note', note);

	if (!read) {
		const mutings = await Mutings.find({
			where: {
				muterId: antenna.userId,
			},
			select: ['muteeId'],
		});

		// Copy
		const _note: Note = {
			...note,
		};

		if (note.replyId != null) {
			_note.reply = await Notes.findOneByOrFail({ id: note.replyId });
		}
		if (note.renoteId != null) {
			_note.renote = await Notes.findOneByOrFail({ id: note.renoteId });
		}

		if (isUserRelated(_note, new Set<string>(mutings.map(x => x.muteeId)))) {
			const updates = {
				read: true,
			};
			await AntennaNotes.update({
				id: newAntennaNoteId,
			}, updates);
			return;
		}

		if (note.userHost != null) {
			const antennaUserProfile = await UserProfiles.findOneBy({
				userId: antenna.userId,
			});
			if (antennaUserProfile.mutedInstances.includes(note.userHost)) {
				const updates = {
					read: true,
				};
				await AntennaNotes.update({
					id: newAntennaNoteId,
				}, updates);
				return;
			}
		}

		// 2秒経っても既読にならなかったら通知
		setTimeout(async () => {
			const unread = await AntennaNotes.findOneBy({ antennaId: antenna.id, read: false });
			if (unread) {
				publishMainStream(antenna.userId, 'unreadAntenna', antenna);
			}
		}, 2000);
	}
}
