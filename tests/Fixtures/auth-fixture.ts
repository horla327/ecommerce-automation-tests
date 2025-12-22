import { test as base, expect, Page } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'storage/auth.json',
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect };
