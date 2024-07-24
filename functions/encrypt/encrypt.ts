// imports

import crypto from "crypto";

export default function encrypt(text: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.CRYPTO_KEY!);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

