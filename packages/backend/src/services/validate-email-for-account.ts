import { validate as validateEmail } from 'deep-email-validator';
import { UserProfiles } from '@/models/index.js';
import { fetchMeta } from '@/misc/fetch-meta.js';
import extractDomain from 'extract-domain';

export async function validateEmailForAccount(emailAddress: string): Promise<{
	available: boolean;
	reason: null | 'used' | 'format' | 'disposable' | 'mx' | 'smtp' | 'blocked';
}> {
	const meta = await fetchMeta();

	const exist = await UserProfiles.countBy({
		emailVerified: true,
		email: emailAddress,
	});

	const validated = meta.enableActiveEmailValidation ? await validateEmail({
		email: emailAddress,
		validateRegex: true,
		validateMx: true,
		validateTypo: false, // TLDを見ているみたいだけどclubとか弾かれるので
		validateDisposable: true, // 捨てアドかどうかチェック
		validateSMTP: false, // 日本だと25ポートが殆どのプロバイダーで塞がれていてタイムアウトになるので
	}) : { valid: true };

	// メールドメインブロックを判定
	const domain = extractDomain(emailAddress);
	let blockedemaildomain = false;
	if (meta.blockedEmailDomains.some(x => x.endsWith(domain))) {
		blockedemaildomain = true;
	}

	const available = exist === 0 && validated.valid && !blockedemaildomain;

	return {
		available,
		reason: available ? null :
		exist !== 0 ? 'used' :
		validated.reason === 'regex' ? 'format' :
		validated.reason === 'disposable' ? 'disposable' :
		validated.reason === 'mx' ? 'mx' :
		validated.reason === 'smtp' ? 'smtp' :
		blockedemaildomain ? 'blocked' :
		null,
	};
}
