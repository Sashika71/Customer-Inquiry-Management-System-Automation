import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';

const authFile = '.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(env.adminEmail, env.adminPassword);
  await expect(page).toHaveURL(/dashboard/);
  await page.context().storageState({ path: authFile });
});