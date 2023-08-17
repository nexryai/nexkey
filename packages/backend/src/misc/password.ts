import bcrypt from 'bcryptjs';
import * as argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(8);
	return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
	if (!isOldAlgorithm(hash)) return argon2.verify(hash, password);

	return await bcrypt.compare(password, hash);
}

export function isOldAlgorithm(hash: string): boolean {
	// bcrypt hashes start with $2[ab]$
	return hash.startsWith('$2');
}
