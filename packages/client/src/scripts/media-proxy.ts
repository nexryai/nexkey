import { query } from '@/scripts/url';
import { url } from '@/config';

export function getProxiedImageUrl(imageUrl: string, type?: 'preview' | 'emoji' | 'avatar' | 'ticker' | 'thumbnail'): string {
	const localProxy = `${url}/proxy`;

	if (imageUrl.startsWith('/proxy/') || imageUrl.startsWith(localProxy + '/')) {
		// もう既にproxyっぽそうだったらurlを取り出す
		imageUrl = (new URL(imageUrl)).searchParams.get('url') ?? imageUrl;
	}
	return `${url}/proxy/image.webp?${query({
		url: imageUrl,
		...(type ? { [type]: '1' } : {}),
	})}`;
}

export function getProxiedImageUrlNullable(imageUrl: string | null | undefined, type?: 'preview' | 'emoji' | 'avatar' | 'ticker' | 'thumbnail'): string | null {
	if (imageUrl == null) return null;
	return getProxiedImageUrl(imageUrl, type);
}
