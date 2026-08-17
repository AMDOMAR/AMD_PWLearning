const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Login to Practice page test', async ({page})=>
{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
console.log("page opened");
const email = "asramd123456@gmail.com";
const emailField = page.locator('#userEmail'); 
const Password = page.locator('#userPassword');
const LoginORRegister = page.locator('#login');
const RegisterHere = page.locator('.text-reset');
const Registrationpage = page.locator('.login-title');
const IncorrectError = page.locator('#toast-container');
const FirstName = page.locator('#firstName');
const LastName = page.locator('#lastName');
const PhoneNo = page.locator('#userMobile');
const OccupationDD = page.locator('[formcontrolname="occupation"]');
const OccupationDoctor = page.locator('[value="1: Doctor"]');
const OccupationStudent = page.locator('[value="2: Student"]');
const OccupationEngineer = page.locator('option[value="3: Engineer"]');
const OccupationScientist = page.locator('[value="4: Scientist"]');
const GenderFemale = page.locator('[value="Female"]');
const ConfirmPW = page.locator('#confirmPassword');
const AgeConfirmation = page.locator('[formcontrolname="required"]');
const successmsg = page.locator('.headcolor');
const LogIn = page.locator('[tabindex="0"]');
const Loginpage = page.locator('.login-title');
const cardTitles = page.locator('.card-body b');
const Products = page.locator('.card-body');
const ProductName = 'ZARA COAT 3';
const CartLink = page.locator('[routerlink*="cart"]');

// await emailField.fill("asramd98@gmail.com");
// await Password.fill("asrasana");
// await LoginORRegister.click();
// console.log(await IncorrectError.textContent());
// await expect(IncorrectError).toContainText('Incorrect');
// await RegisterHere.click();
// console.log(await Registrationpage.textContent());
// await expect(Registrationpage).toContainText("Register");
// await FirstName.fill("Asramd12");
// await LastName.fill("Asramd12");
// await emailField.fill(email);
// await PhoneNo.fill("9542119543");
// await OccupationDD.click();
// await OccupationDD.selectOption({ value: '3: Engineer' });
// //css locator for dropdown selection-- await OccupationDD.selectOption('2: Student');
// await GenderFemale.click();
// await Password.fill("Asr@199812");
// await ConfirmPW.fill("Asr@199812");
// await AgeConfirmation.click();
// await LoginORRegister.click();
// console.log(await successmsg.textContent());
// await expect(successmsg).toContainText("Account Created Successfully");
// await LogIn.click();
// console.log(await Loginpage.textContent());
// await expect(Loginpage).toContainText("Log in");

await emailField.fill(email);
await Password.fill("Asr@199812");
await LoginORRegister.click();
//For getting first element in array use as below
// const firstTitle = (await cardTitles.first().textContent());
// console.log(firstTitle);
//For getting all elements in array use as below because allTextContents donot support auto wait 
await page.waitForLoadState('networkidle');
//If networkidle is not working then use wait for as below
await cardTitles.first().waitFor();
const AllTitles = (await cardTitles.allTextContents());
console.log(AllTitles); 
//Adding Product to Cart as below
const count =await Products.count();
for (let i=0; i<count; ++i)
{
 if (await Products.nth(i).locator("b").textContent() === ProductName)
{
 await Products.nth(i).locator("text= Add To Cart").click();
 break;
}
}
//Validation for Cart items - Item added to cart or not
await CartLink.click();
await page.locator("div li").first().waitFor();
const bool =await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
//Payment for item and confirming order
await page.locator("text=Checkout").click();
await page.locator(".field [type='text']").nth(0).fill("4100 2800 0000 1007");
await page.locator(".field [type='text']").nth(1).fill("1234");
await page.locator(".field [type='text']").nth(2).fill("Asra");
//await page.locator(".field [type='text']").nth(3).fill("1234")
expect( await page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for (let i = 0; i < optionsCount; ++i) {
const text = await dropdown.locator("button").nth(i).textContent();
if (text === " India") {
await dropdown.locator("button").nth(i).click();
break;
      }
}
await page.locator(".action__submit").click();
//Grabing Order Id from Thank You order page
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 
console.log("Order Placed Successfully");
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
//Navigating to Order history page
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
   for (let i = 0; i < await rows.count(); ++i) 
      {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
}
)


