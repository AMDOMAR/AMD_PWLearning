// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { createHook } from 'node:async_hooks';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
 const config = ({ 
  testDir: './tests2',
  timeout: 30_000, 
  expect: {
    timeout: 5000, 
  },
  reporter: 'html',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'retain-on-failure',
  },
});

module.exports=config