import { UserProfiles } from '@/models/index.js';
import { User } from '@/models/entities/user.js';
import { sendEmail } from './send-email.js';
import * as Acct from '@/misc/acct.js';
import { emailDeliver } from '@/queue/index.js';
// TODO
//const locales = await import('../../../../locales/index.js');

// TODO: locale ファイルをクライアント用とサーバー用で分けたい

async function follow(userId: User['id'], follower: User) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('follow')) return;
	emailDeliver(userProfile.email, `New Follower`, `${follower.name} (@${Acct.toString(follower)})`, `${follower.name} (@${Acct.toString(follower)})`);
}

async function receiveFollowRequest(userId: User['id'], follower: User) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('receiveFollowRequest')) return;
	emailDeliver(userProfile.email, `New Follow Request`, `${follower.name} (@${Acct.toString(follower)})`, `${follower.name} (@${Acct.toString(follower)})`);
}

async function reply(userId: User['id'], follower: User, customBody: string) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('reply')) return;
	emailDeliver(userProfile.email, `New Reply`, `${follower.name} (@${Acct.toString(follower)}) <br> ${customBody}`, `${follower.name} (@${Acct.toString(follower)}) ${customBody}`);
}

async function mention(userId: User['id'], follower: User, customBody: string) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('mention')) return;
	emailDeliver(userProfile.email, `New Mention`, `${follower.name} (@${Acct.toString(follower)}) <br> ${customBody}`, `${follower.name} (@${Acct.toString(follower)}) ${customBody}`);
}

async function quote(userId: User['id'], follower: User, customBody: string, url: string) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('quote')) return;
	emailDeliver(userProfile.email, `New Quote`, `${follower.name} (@${Acct.toString(follower)}) <br> ${customBody} <br> ${url}`, `${follower.name} (@${Acct.toString(follower)}) ${customBody} ${url}`);
}

async function groupInvited(userId: User['id'], customBody: string) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('groupInvited')) return;
	emailDeliver(userProfile.email, `New Group Invitation`, `${customBody}`, `${customBody}`);
}

async function app(userId: User['id'], customHeader: string, customBody: string) {
	const userProfile = await UserProfiles.findOneByOrFail({ userId: userId });
	if (!userProfile.email || !userProfile.emailVerified || !userProfile.emailNotificationTypes.includes('app')) return;
	emailDeliver(userProfile.email, `New Application Notice`, `${customHeader} <br> ${customBody}`, `${customHeader} ${customBody}`);
}

export const sendEmailNotification = {
	follow,
	receiveFollowRequest,
	reply,
	mention,
	quote,
	groupInvited,
	app,
};
