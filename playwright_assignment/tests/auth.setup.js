import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
    await page.goto('https://console.neon.tech/app/projects')
    await page.locator('[data-qa=auth-button_github]').click()
    await page.getByLabel('Username or email address').fill('github username goes here')
    await page.getByLabel('Password').fill('github password goes here')
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
    await page.waitForURL('https://console.neon.tech/app/projects?')
    await expect(page.getByText('You are participating in the Neon Technical Preview.'))
        .toBeVisible()
    await page.context().storageState({ path: authFile })
})
