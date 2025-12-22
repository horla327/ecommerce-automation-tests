import {Page} from "@playwright/test";

export class Register {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async userRegistration(name:string, email: string, password:string, days: string, month: string, year:string, firstName : string, lastName: string, company: string, address: string,
        country: string, state: string, city:string, zipcode:string, mobile : string) {
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name)
        await this.page.locator('[data-qa="signup-email"]').fill(email)
        await this.page.getByRole('button', { name: 'Signup' }).click();
        await this.page.getByRole('radio', { name: 'Mrs' }).check({force:true});
        await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
        await this.page.locator('#days').selectOption(days);
        await this.page.locator('#months').selectOption(month);
        await this.page.locator('#years').selectOption(year);
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
        await this.page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
        await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);
        await this.page.getByRole('textbox', { name: 'Address 2' }).fill(address);
        await this.page.getByLabel('Country *').selectOption(country);
        await this.page.getByRole('textbox', { name: 'State *' }).fill(state);
        await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
        await this.page.locator('#zipcode').fill('100200');
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobile);
        await this.page.getByRole('button', { name: 'Create Account' }).click();
        await this.page.getByRole('link', { name: 'Continue' }).click();


    }
}







