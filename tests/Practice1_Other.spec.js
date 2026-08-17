const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Login to Practice page test with Smart Testing', async ({page})=>
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

// await getByPlaceholder("email@example.com").fill("asramd98@gmail.com");
// await getByPlaceholder("enter your passsword").fill("asrasana");
// await getByRole("button", {name: 'Login'}).click();
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

await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill("Asr@199812");
await page.getByRole("button", {name: 'Login'}).click();
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
await Products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();      
//Validation for Cart items - Item added to cart or not
await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
//Payment for item and confirming order
await page.getByRole("button",{name:'Checkout'}).click();
await page.locator(".field [type='text']").nth(0).fill("4100 2800 0000 1007");
await page.locator(".field [type='text']").nth(1).fill("1234");
await page.locator(".field [type='text']").nth(2).fill("Asra");
//await page.locator(".field [type='text']").nth(3).fill("1234")
expect( await page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole("button", {name:"India"}).nth(1).click();
await page.getByText("PLACE ORDER").click();
//Grabing Order Id from Thank You order page
await expect(page.getByText("Thankyou for the order.")).toBeVisible(); 
console.log("Order Placed Successfully");
   
}
)


