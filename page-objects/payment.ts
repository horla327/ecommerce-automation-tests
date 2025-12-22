import {Page} from "@playwright/test";

export class Payment {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async enterCardDetails(name:string, card_number: string, cvv: string, month: string, year: string) {
        await this.page.locator('input[name="name_on_card"]').fill(name)
        await this.page.locator('input[name="card_number"]').fill(card_number)
        await this.page.getByRole('textbox', { name: 'ex.' }).fill(cvv)
        await this.page.getByRole('textbox', { name: 'MM' }).fill(month)
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill(year)
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click()
    }
}

