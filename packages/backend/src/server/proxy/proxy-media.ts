import Koa from 'koa';
import config from '@/config/index.js';
import * as querystring from 'querystring';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function proxyMedia(ctx: Koa.Context) {
	let redirectUrl: string;

	if (config.mediaProxy == null) {
		redirectUrl = 'https://proxy.sda1.net/';
	} else {
		redirectUrl = config.mediaProxy;
	}

	// パスとパラメータを取得
	const { path, query } = ctx.request;
	const queryString = querystring.stringify(query);

	// パスとパラメータを維持してリダイレクト
	const targetUrl = redirectUrl + path + (queryString ? `?${queryString}` : '');

	ctx.redirect(targetUrl);
}
