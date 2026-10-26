const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('AddProductToCart', async ({page})=>
{
const PageTitle = 'Swag Labs';
await page.goto("https://www.saucedemo.com/");
await expect(page).toHaveTitle(PageTitle);
const username = (await page.locator('#login_credentials').innerText()).split("\n").at(1);
console.log(username);
const password = (await page.locator('.login_password').innerText()).split("\n").at(1);
console.log(password);
await page.locator('#user-name').fill(username);
await page.locator('#password').fill(password);
await page.getByRole('button', { name: 'Login' }).click();
await expect(page).toHaveTitle(PageTitle);
await page.locator(".inventory_list").waitFor();
const ProductName = 'Sauce Labs Bike Light';
const Products = page.locator('.inventory_item');
const CartLink = page.locator('.shopping_cart_link');
await expect(Products).toHaveCount(6);
await Products.filter({ hasText: ProductName }).locator('button').click();
await CartLink.click();
await expect(page).toHaveTitle(PageTitle);
await expect(page.locator('.cart_item')).toHaveCount(1);
await expect(page.locator('.inventory_item_name')).toHaveText(ProductName);
await page.getByRole('button', { name: 'Checkout' }).click();
const CheckOutText ='Checkout: Your Information';
await expect(page.locator('.title')).toHaveText(CheckOutText);
await page.getByPlaceholder('First Name').fill('Asra');
await page.getByPlaceholder('Last Name').fill('Md');
await page.getByPlaceholder('Zip/Postal Code').fill('500001');
await page.getByRole('button', { name: 'Continue' }).click();
const CheckOutOverviewText ='Checkout: Overview';
await expect(page.locator('.title')).toHaveText(CheckOutOverviewText);
await expect(page.locator('.inventory_item_name')).toHaveText(ProductName);
await page.getByRole('button', { name: 'Finish' }).click();
const CheckOutCompleteText ='Checkout: Complete!';
await expect(page.locator('.title')).toHaveText(CheckOutCompleteText);
await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
await page.getByRole('button', { name: 'Back Home' }).click();
await expect(page).toHaveTitle(PageTitle);
})