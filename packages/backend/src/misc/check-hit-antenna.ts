import { Antenna } from "@/models/entities/antenna.js";
import { Note } from "@/models/entities/note.js";
import { User } from "@/models/entities/user.js";
import { UserListJoinings, UserGroupJoinings } from "@/models/index.js";
import * as Acct from "@/misc/acct.js";
import { getFullApAccount } from "./convert-host.js";
import { Packed } from "./schema.js";

/**
 * noteUserFollowers / antennaUserFollowing はどちらか一方が指定されていればよい
 */
export async function checkHitAntenna(antenna: Antenna, note: (Note | Packed<"Note">), noteUser: { username: string; host: string | null; }, noteUserFollowers?: User["id"][], antennaUserFollowing?: User["id"][]): Promise<boolean> {
    if (note.visibility === "specified") return false;

    if (note.visibility === "followers") {
        if (noteUserFollowers && !noteUserFollowers.includes(antenna.userId)) return false;
        if (antennaUserFollowing && !antennaUserFollowing.includes(note.userId)) return false;
    }

    if (!antenna.withReplies && note.replyId != null) return false;

    if (antenna.src === "home") {
        if (noteUserFollowers && !noteUserFollowers.includes(antenna.userId)) return false;
        if (antennaUserFollowing && !antennaUserFollowing.includes(note.userId)) return false;
    } else if (antenna.src === "list") {
        const listUsers = (await UserListJoinings.findBy({
            userListId: antenna.userListId!,
        })).map(x => x.userId);

        if (!listUsers.includes(note.userId)) return false;
    } else if (antenna.src === "group") {
        const joining = await UserGroupJoinings.findOneByOrFail({ id: antenna.userGroupJoiningId! });

        const groupUsers = (await UserGroupJoinings.findBy({
            userGroupId: joining.userGroupId,
        })).map(x => x.userId);

        if (!groupUsers.includes(note.userId)) return false;
    } else if (antenna.src === "users") {
        const accts = antenna.users.map(x => {
            const { username, host } = Acct.parse(x);
            return getFullApAccount(username, host).toLowerCase();
        });
        if (!accts.includes(getFullApAccount(noteUser.username, noteUser.host).toLowerCase())) return false;
    }

    const keywords = antenna.keywords
		// Clean up
		.map(xs => xs.filter(x => x !== ""))
		.filter(xs => xs.length > 0);

    if (keywords.length > 0) {
        if (note.text == null) return false;

        const matched = keywords.some(and =>
            and.every(keyword =>
                antenna.caseSensitive
                    ? note.text!.includes(keyword)
                    : note.text!.toLowerCase().includes(keyword.toLowerCase()),
            ));

        if (!matched) return false;
    }

    const excludeKeywords = antenna.excludeKeywords
		// Clean up
		.map(xs => xs.filter(x => x !== ""))
		.filter(xs => xs.length > 0);

    if (excludeKeywords.length > 0) {
        if (note.text == null) return false;

        const matched = excludeKeywords.some(and =>
            and.every(keyword =>
                antenna.caseSensitive
                    ? note.text!.includes(keyword)
                    : note.text!.toLowerCase().includes(keyword.toLowerCase()),
            ));

        if (matched) return false;
    }

    if (antenna.withFile) {
        if (note.fileIds && note.fileIds.length === 0) return false;
    }

    // TODO: eval expression

    return true;
}
