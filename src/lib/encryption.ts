import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET_KEY as string;
const IV_LENGTH = 16;

function checkEncryptionKey() {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
    throw new Error('ENCRYPTION_SECRET_KEY must be at least 32 characters long');
  }
}

export function encrypt(text: string) {
  checkEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
  checkEncryptionKey();
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
