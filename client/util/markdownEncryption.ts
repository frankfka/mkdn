import CryptoJS from 'crypto-js';

// A prefix to tell if markdown was encrypted
const ENCRYPTION_PREFIX = '!mkdn_encrypted:';

export const isMarkdownEncrypted = (val: string): boolean => {
  return val.startsWith(ENCRYPTION_PREFIX);
};

export const encryptMarkdown = (markdown: string, secret: string): string => {
  return ENCRYPTION_PREFIX + CryptoJS.AES.encrypt(markdown, secret).toString();
};

export const decryptMarkdown = (encrypted: string, secret: string): string => {
  const bytes = CryptoJS.AES.decrypt(
    encrypted.replace(ENCRYPTION_PREFIX, ''),
    secret
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
