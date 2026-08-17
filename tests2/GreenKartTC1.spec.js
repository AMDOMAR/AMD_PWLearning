const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('AddProductToCart', async ({page})=>
{
//Login to GreenKart
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

//Add Product to Cart
async function addProduct(page, productName, quantity) {
const product = page.locator('.product').filter({has: page.locator('h4.product-name', { hasText: productName })});
    for (let i = 1; i < quantity; i++) {
        await product.locator('.increment').click();
    }

    await expect(product.locator('.quantity')).toHaveValue(quantity);

    await product.getByRole('button', { name: 'ADD TO CART' }).click();
}
await addProduct(page, 'Onion', '3');

//Verify Product is added to Cart
async function VerifyProductInCart(page, productName) {
   await page.locator('.cart-icon').click();
const productInCart = page.getByRole('listitem').getByText(productName);

await expect(productInCart).toContainText(productName);

}
await VerifyProductInCart(page, 'Onion');

//Proceed to Checkout
await page.getByRole("button", {name: 'PROCEED TO CHECKOUT'}).click();

//Verify Product in Orders Page
async function VerifyProductInOrders(page, productName) {
const row = page.locator('tbody tr').filter({hasText: productName});

await expect(row).toBeVisible();
}
await VerifyProductInOrders (page, 'Onion');

//Placing Order
await page.getByRole("button", {name: 'Place Order'}).click();
await page.locator('select').selectOption('India');
await page.locator('.chkAgree').click();
await page.getByRole("button", {name: 'Proceed'}).click();
await expect(page.getByText('Thank you, your order has been placed successfully')).toBeVisible({ timeout: 5000 });

}
)



