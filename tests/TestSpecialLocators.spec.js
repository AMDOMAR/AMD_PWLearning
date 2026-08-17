const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Test Special Locators', async ({page})=>
{
await page.goto('https://rahulshettyacademy.com/angularpractice');
console.log("page opened");
const email = "asramd123456@gmail.com";
const NameField= page.locator('input[name="name"]');
const EmailField=page.locator('input[name="email"]');

await NameField.first().fill("Asra");
await EmailField.fill(email);
await page.getByPlaceholder("Password").fill("Asr@199812");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
//await page.getByRole('radio', { name: 'Student' }).check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByRole("button", {name: 'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
await page.getByRole("link", {name: 'Shop'}).click();
//Previously did list items with for loop, easier way is as below
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

}
)


