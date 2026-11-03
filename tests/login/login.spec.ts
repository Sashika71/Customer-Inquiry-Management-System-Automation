import { test, expect } from '../../fixtures';
import { env } from '../../utils/env';
import { invalidLogins } from '../../test-data/login.data';

test.describe('Admin login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid admin can log in', async ({ page, loginPage }) => {
    await loginPage.login(env.adminEmail, env.adminPassword);
    await expect(page).toHaveURL(/dashboard/);

    const token = await page.evaluate(() => localStorage.getItem('inquiryDeskToken'));
    expect(token).toBeTruthy();
  });

  for (const data of invalidLogins) {
    test(`shows error for ${data.name}`, async ({ page, loginPage }) => {
      await loginPage.login(data.email, data.password);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).not.toHaveURL(/dashboard/);
    });
  }

  test('password show/hide toggle works', async ({ loginPage }) => {
    await loginPage.passwordInput.fill('secret123');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    await loginPage.toggleButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('empty form does not submit', async ({ page, loginPage }) => {
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/login/);
  });
});