import { IParsedSignature } from '@peertube/http-signature';
import { verify } from 'node:crypto';

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
