const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Browser context Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const Password = page.locator('#password');
    const SignInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-title a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());
    //css
    await page.locator('#username').fill("rahulshetty");
    await page.locator('#password').fill("learning");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect (page.locator("[style*='block']")).toContainText('Incorrect');
    //fill the correct details and login- Also locators for username, password and signin fields are declared above
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await Password.fill("");
    await Password.fill("Learning@830$3mK2");
    await SignInBtn.click();
    console.log("Logged in Successfully");
    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);

});

test ('Page Playwright test', async ({page})=>

{
    await page.goto("https://google.com");
    console.log (await page.title());
    await expect(page).toHaveTitle("Google");
});

test ('Testing Dropdowns, Radio Buttons and Checkboxes', async ({page})=>
{
    const dropdown = page.locator('select.form-control');
    const radiobutton = page.locator('.customradio');
    const checkbox = page.locator('.text-white.termsText');
    const blinktext = page.locator('.blinkingText');
    const blinktext1 = page.locator('.blinkingText[href*="https://rahulshettyacademy"]');
    const blinktext2 = page.locator('.blinkingText[href="http://qasummit.org/"]');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.click();
    await dropdown.selectOption("consult");
    await radiobutton.last().click();
    await page.locator('#okayBtn').click();
    console.log (await radiobutton.last().isChecked());
    await expect (await radiobutton.last()).toBeChecked();
    await checkbox.click();
    await expect (await checkbox).toBeChecked();
    await checkbox.uncheck();
    expect (await checkbox.isChecked()).toBeFalsy();
    //when two blinking texts are present then assertion would be like this with same class
    await expect(blinktext).toHaveCount(2);
    //when two blinking texts are present then assertion for each text individually
    await expect(blinktext.nth(0)).toBeVisible();
    await expect(blinktext.nth(1)).toBeVisible();
    console.log ( await blinktext.nth(0).textContent());
    //await blinktext1.click();
    //await page.pause();
})

test.only ('Child Tabs and navigation between tabs', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinktext1 = page.locator('.blinkingText[href*="https://rahulshettyacademy"]');

    const [newPage] = await Promise.all ([
        context.waitForEvent('page'),
        blinktext1.click(),
    ])  

    const redlinetext = newPage.locator(".red");
    const text = await redlinetext.textContent();
    console.log(text);
    //to get the domain from the text, split it based on @ and space
    const arrayText = await text.split("@")
    const domain = await arrayText[1].split(" ")[0]
    //console.log(domain);
    const userName = page.locator('#username');
    await userName.fill(domain);
    //await page.pause();
    //We are filling username field to grab that content we can use inputValue function not textContent
    console.log(await userName.inputValue());
})
