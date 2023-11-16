import * as Misskey from 'misskey-js';
import { markRaw } from 'vue';
import { $i } from '@/account';
import { wsOrigin } from '@/config';

export const stream = markRaw(new Misskey.Stream(wsOrigin, $i ? {
	token: $i.token,
} : null));
