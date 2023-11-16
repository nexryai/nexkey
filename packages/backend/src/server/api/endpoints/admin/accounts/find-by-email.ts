import { Users, UserProfiles } from '@/models/index.js';
import { ApiError } from '../../../error.js';
import define from '../../../define.js';

export const meta = {
	tags: ['admin'],

	requireCredential: true,
	requireAdmin: true,

	res: {
		type: 'object',
		nullable: false, optional: false,
	},

	errors: {
		userNotFound: {
			message: 'No such user who has the email address.',
			code: 'USER_NOT_FOUND',
			id: 'cb865949-8af5-4062-a88c-ef55e8786d1d',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		email: { type: 'string' },
	},
	required: ['email'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, me) => {
  const profile = await UserProfiles.findOneBy({ email: ps.email });

  if (profile == null) {
		throw new ApiError(meta.errors.userNotFound);
	}

	const user = await Users.findOneBy({ id: profile.userId });

	if (user == null) {
		throw new ApiError(meta.errors.userNotFound);
	}

	const _me = await Users.findOneBy({ id: me.id });
	if ((!_me.isAdmin) && (user.isAdmin || user.isModerator)) {
		throw new ApiError(meta.errors.userNotFound);
	}

  return await Users.pack(user, me, {
    detail: true,
  });
});
