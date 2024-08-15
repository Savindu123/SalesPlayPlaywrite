import { test, expect } from '@playwright/test';

test('Verify the Sign Up page Title', async ({ page }) => {
    await page.goto('https://webpos.salesplaypos.com/registration');
    await expect(page).toHaveTitle(/SalesPlay - Web POS Registration/);
    
  });