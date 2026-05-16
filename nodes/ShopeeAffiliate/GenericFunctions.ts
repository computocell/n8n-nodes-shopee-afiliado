import crypto from 'crypto';

export function generateSignature(
  appId: string,
  timestamp: number,
  payload: string,
  secret: string,
) {
  return crypto
    .createHash('sha256')
    .update(appId + timestamp + payload + secret)
    .digest('hex');
}