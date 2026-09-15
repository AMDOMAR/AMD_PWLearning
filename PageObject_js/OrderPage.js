class OrderPage
{
constructor(page)
{
    this.page = page;
    this.row = page.locator('tbody tr').filter({hasText: productName});
    this.placeOrder = page.getByRole("button", {name: 'Place Order'});
    this.selectCountry = page.locator('select').selectOption('India');
    this.agreeTerms = page.locator('.chkAgree');
    this.proceedforOrder = page.getByRole("button", {name: 'Proceed'});;  
    this.thankyouMessage = page.getByText('Thank you, your order has been placed successfully');
}

async VerifyProductInOrders(page, productName) {

await expect(row).toBeVisible();
}

async PlaceOrder() {

await this.placeOrder.click();
await this.selectCountry;
await this.agreeTerms.click();
await this.proceedforOrder.click();
await expect(this.thankyouMessage).toBeVisible({ timeout: 5000 });
}
}
module.exports = {OrderPage};
