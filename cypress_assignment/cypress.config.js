const { defineConfig } = require('cypress')
const setConfig = require('./cypress/plugins/index')

module.exports = defineConfig({
    env: {
        gitHubUser: 'google login goes here',
        gitHubPassword: 'password goes here',
        device: 'desktop'
    },
    retries: {
        runMode: 1
    },
    defaultCommandTimeout: 15000,
    numTestsKeptInMemory: 10,
    chromeWebSecurity: false,
    video: false,
    videoUploadOnPasses: false,
    e2e: {
        setupNodeEvents: setConfig,
        baseUrl: 'https://console.neon.tech'
    }
})
