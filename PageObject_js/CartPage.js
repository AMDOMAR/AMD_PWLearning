const {test, expect} = require('@playwright/test');
class CartPage
{
    
constructor(page)
{
    this.page = page;
    this.product = page.locator('.product').filter({has: page.locator('h4.product-name', { hasText: productName })});
    this.cart = page.locator('.cart-icon');
    this.productInCart = page.getByRole('listitem').getByText(productName);
    this.checkout = page.getByRole("button", {name: 'PROCEED TO CHECKOUT'});

}

async addProduct(page, productName, quantity) {

    for (let i = 1; i < quantity; i++) {
        await this.product.locator('.increment').click();
    }
    await expect(this.product.locator('.quantity')).toHaveValue(quantity);

    await this.product.getByRole('button', { name: 'ADD TO CART' }).click();
}

async VerifyProductInCart(page, productName) {
   await this.cart.click();
await expect(this.productInCart).toContainText(productName);

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator('.product').filter({has: page.locator('h4.product-name', { hasText: productName })});
}

}
module.exports = {CartPage};