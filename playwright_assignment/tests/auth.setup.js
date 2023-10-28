import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
    await page.goto('https://console.neon.tech/app/projects')
    await page.locator('[data-qa=auth-button_github]').click()
    await page.getByLabel('Username or email address').fill('cstemmer')
    await page.getByLabel('Password').fill('RnC15363!')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForURL('https://console.neon.tech/app/projects?')
    await expect(page.getByText('You are participating in the Neon Technical Preview.'))
        .toBeVisible()
    await page.context().storageState({ path: authFile })
})
