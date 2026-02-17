import { expect, test as base } from '@playwright/test';
import { getWebUrl } from './getWebUrl.js';

const options = { webUrl: getWebUrl() } as const;
const test = base.extend<typeof options>(options);

test('admin can start a match', async ({ page, browserName, webUrl }) => {
  await page.goto(webUrl);
  const someRoomName = `${browserName}_some-room-name`;
  await page.getByRole('textbox', { name: /room name/i }).fill(someRoomName);
  await page.getByRole('button', { name: /create room/i }).click();
  await page.waitForURL(`${webUrl}/rooms/${someRoomName}`);
  await page.getByRole('button', { name: /start match/i }).click();
});

test('not admin can not start a match', async ({
  page,
  browserName,
  webUrl,
}) => {
  const someRoomName = `${browserName}_some-room-name`;
  await page.goto(`${webUrl}/rooms/${someRoomName}`);

  await expect(page.getByRole('button', { name: /start match/i })).toHaveCount(
    0,
  );
});
