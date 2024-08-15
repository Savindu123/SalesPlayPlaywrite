import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import {webkit, chromium, firefox} from 'playwright'


test('Verify the Sign In page Title', async ({ page }) => {
  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await expect(page).toHaveTitle(/SalesPlay - Web POS Sign in/);
  
});

test('Sign without Email & Password', async ({ page }) => {

  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByText('Please provide your username').click();
  await expect(page.locator('#frm_replace_signin')).toContainText('Please provide your username and password.');
  
});

test('Sign with Incorrect Email & Password', async ({ page }) => {

  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('weblive@yopmail.com');
  await page.getByPlaceholder('Password').fill('12345678');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('#frm_replace_signin')).toContainText('Incorrect Username or Password');
  
});

test('Sign with Invalid Email and Password', async ({ page }) => {

  //const browser:BrowserContext = await chromium.launchPersistentContext('',{headless: false, channel: 'chrome'})
  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('webliv.com');
  await page.getByPlaceholder('Password').fill('      ');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('#frm_replace_signin')).toContainText('Invalid Username or Password');
  
});

test('Sign with valid Email with Spaces before and after the email and Valid Password', async ({ page }) => {
  

  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('   weblive@yopmail.com   ');
  await page.getByPlaceholder('Password').fill('123456789');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('#frm_replace_signin')).toContainText('Incorrect Username or Password');
  
});

test('Sign with valid Email and Password', async ({}) => {

  const browser:BrowserContext = await chromium.launchPersistentContext('C:/Users/USER/AppData/Local/Google/Chrome/User Data',{channel: 'chrome',headless: false});

  const pages = browser.pages();
  const page:Page = pages[0];

  await page.goto('https://webpos.salesplaypos.com/sign_in');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test@automation.lk');
  await page.getByPlaceholder('Password').fill('Iloveyouh1996*');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.waitForTimeout(5010);
  await expect(page).toHaveURL('https://webpos.salesplaypos.com/?license_token=QllGVHowOFpjbEtZaXdYQzNLZXdmQT09');

});


  
