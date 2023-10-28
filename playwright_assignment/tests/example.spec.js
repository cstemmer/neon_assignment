import { test, expect } from '@playwright/test'
import { creationForm } from '../objects/create_project_page.obj'
import { dashboard } from '../objects/dashboard.obj'
import { successModal } from '../objects/creation_success_modal.obj'

const defaultPostgre = '15'
const defaultUser = 'conrad.stemmer'
const defaultRegion = 'aws-us-east-2'
const defaultMinScaling = 0.25
const defaultMaxScaling = 0.25
const defaultDbName = 'neondb'
const defaultBranchName = 'main'
const defaultHost = 'us-east-2.aws.neon.tech'
const customProject = 'myNewProject'
const customPostgre = '16'
const customDbName = 'customer'
const customLocation = 'Europe (Frankfurt)'
const customRegion = 'aws-eu-central-1'
const customBranchName = 'head'
const customHost = 'eu-central-1.aws.neon.tech'

test.describe('Project creation form', async () => {
    test('validate ui fields and texts', async ({ page }) => {
        await page.goto('https://console.neon.tech/app/projects')
        await expect(page.locator(creationForm.pageHeading)).toBeVisible()
        await expect(page.locator(creationForm.pageHeading)).toHaveText('Create project')
        await expect(page.locator(creationForm.form)).toBeVisible()
        await expect(page.locator(creationForm.projectNameLabel)).toBeVisible()
        await expect(page.locator(creationForm.projectNameLabel)).toHaveText('Project name')
        await expect(page.locator(creationForm.projectNameInput)).toBeVisible()
        await expect(page.locator(creationForm.projectNameInput))
            .toHaveAttribute('placeholder', 'e.g., your app name or customer name')
        await expect(page.locator(creationForm.postgresVersionLabel)).toBeVisible()
        await expect(page.locator(creationForm.postgresVersionLabel))
            .toHaveText('Postgres version')
        await expect(page.locator(creationForm.postgresVersionInput)).toBeVisible()
        await expect(page.locator(creationForm.postgresVersionInput)).toHaveText(defaultPostgre)
        await expect(page.locator(creationForm.resourcesText)).toBeVisible()
        await expect(page.locator(creationForm.resourcesText))
            .toHaveText('Resources are organized within a project.')
        await expect(page.locator(creationForm.databaseNameLabel)).toBeVisible()
        await expect(page.locator(creationForm.databaseNameLabel)).toHaveText('Database name')
        await expect(page.locator(creationForm.databaseNameInput)).toBeVisible()
        await expect(page.locator(creationForm.databaseNameInput))
            .toHaveAttribute('placeholder', 'neondb')
        await expect(page.locator(creationForm.freeTierTermsText)).toBeVisible()
        await expect(page.locator(creationForm.freeTierTermsText))
            .toHaveText('Your Free Tier project is created with a single Read/Write'
        + ' compute that automatically scales to zero after five minutes of inactivity.')
        await expect(page.locator(creationForm.freeTierIcon)).toBeVisible()
        await expect(page.locator(creationForm.regionLabel)).toBeVisible()
        await expect(page.locator(creationForm.regionLabel)).toHaveText('Region')
        await expect(page.locator(creationForm.regionValue)).toBeVisible()
        await expect(page.locator(creationForm.regionValue)).toHaveText('US East (Ohio)')
        await expect(page.locator(creationForm.submitButton)).toBeVisible()
        await expect(page.locator(creationForm.submitButton)).toBeEnabled()
        await expect(page.locator(creationForm.submitButton)).toHaveText('Create project')
        await expect(page.locator(creationForm.advancedOptions)).toBeHidden()
        await expect(page.locator(creationForm.moreOptionsButton)).toBeVisible()
        await expect(page.locator(creationForm.moreOptionsButton)).toHaveText('More options')
        await page.locator(creationForm.moreOptionsButton).click()
        await expect(page.locator(creationForm.advancedOptions)).toBeVisible()
        await expect(page.locator(creationForm.advanceOptionsHeader)).toBeVisible()
        await expect(page.locator(creationForm.advanceOptionsHeader))
            .toHaveText('Branch data the same way you branch code')
        await expect(page.locator(creationForm.branchingText)).toBeVisible()
        await expect(page.locator(creationForm.branchingText))
            .toHaveText('Neon supports data branching. The Free Tier permits up'
        + ' to 10 branches, each with its own compute resources. Provide a name for your'
        + ' primary branch or use the default name (main).')
        await expect(page.locator(creationForm.branchingTermsText)).toBeVisible()
        await expect(page.locator(creationForm.branchingTermsText))
            .toHaveText('Data on the primary branch is always accessible. Access'
        + ' to data on non-primary branches is subject to Free Tier compute limits. Read more ')
        await expect(page.locator(creationForm.primaryBranchLabel)).toBeVisible()
        await expect(page.locator(creationForm.primaryBranchLabel))
            .toHaveText('Primary branch name')
        await expect(page.locator(creationForm.primaryBranchInput)).toBeVisible()
        await expect(page.locator(creationForm.primaryBranchInput))
            .toHaveAttribute('placeholder', 'main')
        await expect(page.locator(creationForm.branchingTermsLink)).toBeVisible()
        await expect(page.locator(creationForm.branchingTermsLink)).toHaveText('Read more ')
        await expect(page.locator(creationForm.branchingTermsLink))
            .toHaveAttribute('href', 'https://neon.tech/docs/introduction/free-tier')
        await expect(page.locator(creationForm.branchingTermsIcon)).toBeVisible()
        await expect(page.locator(creationForm.moreOptionsButton)).toBeVisible()
        await expect(page.locator(creationForm.moreOptionsButton)).toHaveText('Fewer options')
        await page.locator(creationForm.moreOptionsButton).click()
        await expect(page.locator(creationForm.submitButton)).toBeVisible()
        await expect(page.locator(creationForm.submitButton)).toBeEnabled()
        await expect(page.locator(creationForm.submitButton)).toHaveText('Create project')
        await expect(page.locator(creationForm.advancedOptions)).toBeHidden()
    })

    test('validate user can create project without filling in the form and close modal',
        async ({ page }) => {
            await page.goto('https://console.neon.tech/app/projects')
            await page.locator(creationForm.submitButton).click()
            await expect(page.locator(successModal.modal)).toBeVisible()
            await expect(page.locator(successModal.modalHeader)).toBeVisible()
            await expect(page.locator(successModal.modalHeader))
                .toHaveText('Connection details for your new project')
            await expect(page.locator(successModal.successMessage)).toBeVisible()
            await expect(page.locator(successModal.successMessage))
                .toHaveText(`Project ${defaultUser}'s project with database`
    + ` ${defaultDbName} was created successfully.`)
            await expect(page.locator(successModal.modalHeader))
                .toHaveCSS('color', 'rgb(92, 102, 112)')
            await expect(page.locator(successModal.successIcon)).toBeVisible()
            await expect(page.locator(successModal.closeButton)).toBeVisible()
            await page.locator(successModal.closeButton).click()
            await expect(page.locator(dashboard.projectPath)).toBeVisible()
            await expect(page.locator(dashboard.projectPath))
                .toHaveText(`Home/${defaultUser}'s project`)
            // cleanup project for next test
            await page.goto('https://console.neon.tech/app/projects')
            await page.locator('[data-qa=project-actions]').click()
            await page.locator('[data-qa=project-settings-link]').click()
            await page.locator('[data-qa-id=delete]').click()
            await page.locator('[data-qa=delete-project-button]').click()
            await page.locator('[data-qa=confirmation_confirm_button]').click()
            await expect(page.locator(creationForm.pageHeading)).toBeVisible()
        })

    test('validate user can fill in the form, create the project and close modal',
        async ({ page }) => {
            await page.goto('https://console.neon.tech/app/projects')
            await page.locator(creationForm.projectNameInput).fill(customProject)
            await page.locator(creationForm.postgresVersionInput).click()
            await page.getByText(customPostgre).click()
            await expect(page.locator(creationForm.postgresVersionInput)).toBeVisible()
            await expect(page.locator(creationForm.postgresVersionInput)).toHaveText(customPostgre)
            await page.locator(creationForm.databaseNameInput).fill(customDbName)
            await page.locator(creationForm.regionInput).click()
            await page.getByText(customLocation).click()
            await expect(page.locator(creationForm.regionValue)).toBeVisible()
            await expect(page.locator(creationForm.regionValue)).toHaveText(customLocation)
            await page.locator(creationForm.moreOptionsButton).click()
            await page.locator(creationForm.primaryBranchInput).clear()
            await page.locator(creationForm.primaryBranchInput).fill(customBranchName)
            await page.locator(creationForm.submitButton).click()
            await expect(page.locator(successModal.modal)).toBeVisible()
            await expect(page.locator(successModal.modalHeader)).toBeVisible()
            await expect(page.locator(successModal.modalHeader))
                .toHaveText('Connection details for your new project')
            await expect(page.locator(successModal.successMessage)).toBeVisible()
            await expect(page.locator(successModal.successMessage))
                .toHaveText(`Project ${customProject} with database`
    + ` ${customDbName} was created successfully.`)
            await expect(page.locator(successModal.modalHeader))
                .toHaveCSS('color', 'rgb(92, 102, 112)')
            await expect(page.locator(successModal.successIcon)).toBeVisible()
            await expect(page.locator(successModal.closeButton)).toBeVisible()
            await page.locator(successModal.closeButton).click()
            await expect(page.locator(dashboard.projectPath)).toBeVisible()
            await expect(page.locator(dashboard.projectPath)).toHaveText(`Home/${customProject}`)
            // cleanup project for next test
            await page.goto('https://console.neon.tech/app/projects')
            await page.locator('[data-qa=project-actions]').click()
            await page.locator('[data-qa=project-settings-link]').click()
            await page.locator('[data-qa-id=delete]').click()
            await page.locator('[data-qa=delete-project-button]').click()
            await page.locator('[data-qa=confirmation_confirm_button]').click()
            await expect(page.locator(creationForm.pageHeading)).toBeVisible()
        })
})
