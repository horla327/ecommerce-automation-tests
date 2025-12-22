import {Page} from "@playwright/test";

export class Login {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async loginWithUsernameAndPassword(email:string, password: string) {
        await this.page.locator('[data-qa="login-email"]').fill(email)
        await this.page.locator('[data-qa="login-password"]').fill(password)
        await this.page.locator('[data-qa="login-button"]').click()
    }
}