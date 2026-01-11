import { test } from '@playwright/test';
import { Login } from '../page-objects/login';

test('authenticate user', async ({ page }) => {
  await page.goto('/login');

  const login = new Login(page);
      await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@123');

  // Verify login worked
  //await page.locator('[data-test="title"]').waitFor();

  // Save browser state
  await page.context().storageState({ path: 'storage/auth.json'});
});  

//npx playwright test tests/auth.setup.ts  


//npx playwright test tests/all-tests.spec.ts --project=chromium -g "has title"

