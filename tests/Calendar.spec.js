const {test, expect} = require ('@playwright/test');
const { title } = require('node:process');

test ('Calendar Test', async ({page})=>
{

const Date = "15";
const Month = "6";
const Year = "2027";
const expectedList = [Month,Date,Year];

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(Year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Month-1).click();
await page.locator("//abbr[text()='"+Date+"']").click();
const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }

}
)


