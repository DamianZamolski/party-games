import { fail } from 'node:assert';

export function getWebUrl(): string {
  const webUrl = process.env.WEB_URL;

  if (!webUrl) {
    fail('WEB_URL missing');
  }

  return webUrl;
}
