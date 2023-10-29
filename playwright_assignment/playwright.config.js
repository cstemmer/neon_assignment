// @ts-check
const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
    expect: {
        timeout: 30000
    },
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: 'html',
    use: {

        trace: 'on-first-retry'
    },

    projects: [
        { name: 'setup', testMatch: /.*\.setup\.js/ },

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        }
    ]
})

