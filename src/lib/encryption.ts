import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const algorithm = 'aes-256-gcm';
const secret = process.env.ENCRYPTION_SECRET_KEY;

if (!secret || secret.length < 32) {
  throw new Error('ENCRYPTION_SECRET_KEY must be at least 32 characters long');
}

const key = scryptSync(secret, 'salt', 32);

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${encrypted.toString('hex')}:${authTag.toString('hex')}`;
}

export function decrypt(hash: string): string {
  const [ivHex, encryptedHex, authTagHex] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString();
}
