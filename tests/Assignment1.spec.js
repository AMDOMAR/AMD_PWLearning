const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Assignment1', async ({page})=>
{
await page.goto('https://eventhub.rahulshettyacademy.com');
console.log("page opened");
const email = "asramd123456@gmail.com";


await page.getByPlaceholder("you@email.com").fill(email);
await page.getByLabel("Password").fill("Asr@199812");
await page.locator("#login-btn").click();
await page.getByRole("link", {name: 'Browse Events →'}).isVisible();
await page.locator('a[href="/admin/events"]').click();
const EventName= await page.getByPlaceholder("Event title").fill("Test Event ${Date.now()}").textContent();



}
)


