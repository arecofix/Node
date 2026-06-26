import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // Un solo worker para evitar bloqueos en la BD SQLite
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'on-first-retry',
    headless: true,
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
