import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // Login tests: session nathuwa (fresh) run wenawa
    {
      name: 'login',
      testMatch: /login\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    
    {
      name: 'chromium',
      testIgnore: /login\/.*\.spec\.ts|auth\.setup\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
    },
  ],
});