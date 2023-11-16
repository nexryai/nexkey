import * as Acct from 'misskey-js/built/acct';
import { i18n } from '@/i18n';
import * as os from '@/os';

export async function lookupUser() {
	const { canceled, result } = await os.inputText({
		title: i18n.ts.usernameOrUserId,
	});
	if (canceled) return;

	const show = (user) => {
		os.pageWindow(`/user-info/${user.id}`);
	};

	const usernamePromise = os.api('users/show', Acct.parse(result));
	const idPromise = os.api('users/show', { userId: result });
	let _notFound = false;
	const notFound = () => {
		if (_notFound) {
			os.alert({
				type: 'error',
				text: i18n.ts.noSuchUser
			});
		} else {
			_notFound = true;
		}
	};
	usernamePromise.then(show).catch(err => {
		if (err.code === 'NO_SUCH_USER') {
			notFound();
		}
	});
	idPromise.then(show).catch(err => {
		notFound();
	});
}

export async function lookupUserByEmail() {
	const { canceled, result } = await os.inputText({
		title: i18n.ts.emailAddress,
		type: 'email',
	});
	if (canceled) return;

	try {
		const user = await os.apiWithDialog('admin/accounts/find-by-email', { email: result });

		os.pageWindow(`/user-info/${user.id}`);
	} catch (err) {
		throw err;
	}
}
