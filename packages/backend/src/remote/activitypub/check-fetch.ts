import { IParsedSignature } from '@peertube/http-signature';
import { verify } from 'node:crypto';
import { toSingle } from '@/prelude/array.js';
import { createHash } from 'node:crypto';

export function verifySignature(sig: IParsedSignature, key: UserPublickey): boolean {
	if (!['hs2019', 'rsa-sha256'].includes(sig.algorithm.toLowerCase())) return false;
	try {
		return verify('rsa-sha256', Buffer.from(sig.signingString, 'utf8'), key.keyPem, Buffer.from(sig.params.signature, 'base64'));
	}
	catch {
		// Algo not supported
		return false;
	}
}

export function verifyDigest(body: string, digest: string | string[] | undefined): boolean {
	digest = toSingle(digest);
	if (body == null || digest == null || !digest.toLowerCase().startsWith('sha-256='))
		return false;

	return createHash('sha256').update(body).digest('base64') === digest.substring(8);
}
