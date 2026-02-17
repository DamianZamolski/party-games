import { expect, test } from '@playwright/test';
import { fail } from 'assert';

export function getWebUrl() {
  const webUrl = process.env.WEB_URL;

  if (!webUrl) {
    fail('WEB_URL missing');
  }

  return webUrl;
}

test('admin can start a match', async ({ page, browserName }) => {
  const webUrl = getWebUrl();
  await page.goto(webUrl);
  const someRoomName = `${browserName}_some-room-name`;
  await page.getByRole('textbox', { name: /room name/i }).fill(someRoomName);
  await page.getByRole('button', { name: /create room/i }).click();
  await page.waitForURL(`${webUrl}/rooms/${someRoomName}`);
  await page.getByRole('button', { name: /start match/i }).click();
});

test('not admin can not start a match', async ({ page, browserName }) => {
  const webUrl = getWebUrl();
  const someRoomName = `${browserName}_some-room-name`;
  await page.goto(`${webUrl}/rooms/${someRoomName}`);

  await expect(page.getByRole('button', { name: /start match/i })).toHaveCount(
    0,
  );
});
