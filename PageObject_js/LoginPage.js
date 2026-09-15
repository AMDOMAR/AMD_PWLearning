class LoginPage {

constructor(page)
{
    this.page = page;

}

async goTo()
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
}

}
module.exports = {LoginPage};