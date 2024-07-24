// imports

import crypto from "crypto";

export default function decrypt(text: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', 'your-secret-key');
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}