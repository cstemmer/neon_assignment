import { test, expect } from '@playwright/test'

const defaultUser = 'gmail username goes here'
const defaultPostgre = 15
const defaultLocation = 'US East (Ohio)'
const defaultRegion = 'aws-us-east-2'
const defaultMinScaling = 0.25
const defaultMaxScaling = 0.25
const defaultDbName = 'neondb'
const defaultBranchName = 'main'
const defaultHost = 'us-east-2.aws.neon.tech'
const customProject = 'myNewProject'
const customPostgre = 16
const customDbName = 'customer'
const customLocation = 'Europe (Frankfurt)'
const customRegion = 'aws-eu-central-1'
const customBranchName = 'head'
const customHost = 'eu-central-1.aws.neon.tech'

test.describe('Project creation form UI checks', async () => {
    test('validate ui fields and texts', async ({ page }) => {
        await page.goto('https://console.neon.tech/app/projects')
        await expect(page.getByRole('heading', { name: 'Create project' })).toBeVisible()
        await expect(page.getByText('Project name')).toBeVisible()
        await expect(page.locator('#projectName')).toBeVisible()
        await expect(page.locator('#projectName'))
            .toHaveAttribute('placeholder', 'e.g., your app name or customer name')
        await expect(page.getByText('Postgres version')).toBeVisible()
        await expect(page.locator('#postgresVersion_select div').nth(1)).toBeVisible()
        await expect(page.locator('#postgresVersion_select div').nth(1))
            .toHaveText(defaultPostgre.toString())
        await expect(page.getByText('Resources are organized within a project.')).toBeVisible()
        await expect(page.getByText('Database name')).toBeVisible()
        await expect(page.locator('#databaseName')).toBeVisible()
        await expect(page.locator('#databaseName')).toHaveAttribute('placeholder', 'neondb')
        await expect(page.getByText('Your Free Tier project is created with a single Read/Write'
          + ' compute that automatically scales to zero after five minutes of inactivity.'))
            .toBeVisible()
        await expect(page.locator('form').getByRole('img')).toBeVisible()
        await expect(page.locator('label').filter({ hasText: 'Region' })).toBeVisible()
        await expect(page.locator('#region_select div')
            .filter({ hasText: defaultLocation }).nth(1)).toBeVisible()
        await expect(page.getByText('Select the region closest to your application.')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeEnabled()
        await expect(page.locator('form > :nth-child(5)')).toBeHidden()
        await expect(page.getByRole('button', { name: 'More options' })
            .filter({ hasText: 'More options' })).toBeVisible()
        await page.getByRole('button', { name: 'More options' })
            .filter({ hasText: 'More options' }).click()
        await expect(page.locator('form > :nth-child(5)')).toBeVisible()
        await expect(page.getByRole('heading',
            { name: 'Branch data the same way you branch code' })
            .filter({ hasText: 'Branch data the same way you branch code' }))
            .toBeVisible()
        await expect(page.getByText('Neon supports data branching. The Free Tier permits up'
        + ' to 10 branches, each with its own compute resources. Provide a name for your'
        + ' primary branch or use the default name (main).')).toBeVisible()
        await expect(page.getByText('Primary branch name')).toBeVisible()
        await expect(page.locator('#primaryBranchName')).toBeVisible()
        await expect(page.locator('#primaryBranchName')).toHaveAttribute('placeholder', 'main')
        await expect(page.locator('form').getByRole('img').nth(1)).toBeVisible()
        await expect(page.getByText('Data on the primary branch is always accessible. Access'
        + ' to data on non-primary branches is subject to Free Tier compute limits. Read more'))
            .toBeVisible()
        await expect(page.locator('form').getByRole('link', { name: 'Read more' }))
            .toHaveAttribute('href', 'https://neon.tech/docs/introduction/free-tier')
        await expect(page.getByRole('button', { name: 'Fewer options' })
            .filter({ hasText: 'Fewer options' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeEnabled()
        await page.getByRole('button', { name: 'Fewer options' })
            .filter({ hasText: 'Fewer options' }).click()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create project' })
            .filter({ hasText: 'Create project' })).toBeEnabled()
        await expect(page.locator('form > :nth-child(5)')).toBeHidden()
    })
})

test.describe('Project creation form functional and API checks', async () => {
    test.afterEach(async ({ page }) => {
    // cleanup project for next test
        await page.goto('https://console.neon.tech/app/projects')
        await page.locator('[data-qa=project-actions]').click()
        await page.locator('[data-qa=project-settings-link]').click()
        await page.locator('[data-qa-id=delete]').click()
        await page.locator('[data-qa=delete-project-button]').click()
        await page.locator('[data-qa=confirmation_confirm_button]').click()
        await expect(page.getByRole('heading', { name: 'Create project' })).toBeVisible()
    })

    test('validate user can create project without filling in the form and close modal',
        async ({ page }) => {
            await page.goto('https://console.neon.tech/app/projects')
            const responsePromise = page
                .waitForResponse('https://console.neon.tech/api/v2/projects')

            await page.getByRole('button', { name: 'Create project' }).click()
            const response = await responsePromise
            const resp = await response.json()

            expect(resp.project.name).toBe(`${defaultUser}'s project`)
            expect(resp.project.default_endpoint_settings.autoscaling_limit_min_cu)
                .toBe(defaultMinScaling)
            expect(resp.project.default_endpoint_settings.autoscaling_limit_max_cu)
                .toBe(defaultMaxScaling)
            expect(resp.project.pg_version).toBe(defaultPostgre)
            expect(resp.project.proxy_host).toBe(defaultHost)
            expect(resp.connection_uris[0].connection_uri).toContain(defaultHost)
            expect(resp.connection_uris[0].connection_parameters.database).toBe(defaultDbName)
            expect(resp.connection_uris[0].connection_parameters.role).toBe(defaultUser)
            expect(resp.connection_uris[0].connection_parameters.host).toContain(defaultHost)
            expect(resp.connection_uris[0].connection_parameters.pooler_host)
                .toContain(defaultHost)
            expect(resp.roles[0].name).toBe(defaultUser)
            expect(resp.databases[0].name).toBe(defaultDbName)
            expect(resp.databases[0].owner_name).toBe(defaultUser)
            expect(resp.branch.name).toBe(defaultBranchName)
            expect(resp.endpoints[0].host).toContain(defaultHost)
            expect(resp.endpoints[0].autoscaling_limit_min_cu).toBe(defaultMinScaling)
            expect(resp.endpoints[0].autoscaling_limit_max_cu).toBe(defaultMaxScaling)
            expect(resp.endpoints[0].region_id).toBe(defaultRegion)
            await expect(page.locator('[data-qa=create_project_success]')).toBeVisible()
            await expect(page.getByText('Connection details for your new project')).toBeVisible()
            await expect(page.getByText(`Project ${defaultUser}'s project with database`
            + ` ${defaultDbName} was created successfully.`)).toBeVisible()
            await expect(page.getByText(`Project ${defaultUser}'s project with database`
            + ` ${defaultDbName} was created successfully.`))
                .toHaveCSS('color', 'rgb(31, 153, 96)')
            await expect(page.locator('circle').first()).toBeVisible()
            await expect(page.locator('[data-qa=create_project_success] > :nth-child(1) button'))
                .toBeVisible()
            await page.locator('[data-qa=create_project_success] > :nth-child(1) button').click()
            await expect(page.getByText(`Home/${defaultUser}'s project`)).toBeVisible()
        })

    test('validate user can fill in the form, create the project and close modal',
        async ({ page }) => {
            await page.goto('https://console.neon.tech/app/projects')
            const responsePromise = page
                .waitForResponse('https://console.neon.tech/api/v2/projects')

            await page.locator('#projectName').fill(customProject)
            await page.locator('#postgresVersion_select div').nth(1).click()
            await page.getByText(customPostgre.toString()).click()
            await expect(page.locator('#postgresVersion_select div').nth(1))
                .toHaveText(customPostgre.toString())
            await page.locator('#databaseName').fill(customDbName)
            await page.locator('#region_select div')
                .filter({ hasText: defaultLocation }).nth(1).click()
            await page.getByText(customLocation).click()
            await expect(page.locator('#region_select div')
                .filter({ hasText: customLocation }).nth(1)).toBeVisible()
            await page.getByRole('button', { name: 'More options' })
                .filter({ hasText: 'More options' }).click()
            await page.locator('#primaryBranchName').clear()
            await page.locator('#primaryBranchName').fill(customBranchName)
            await page.getByRole('button', { name: 'Create project' }).click()
            const response = await responsePromise
            const resp = await response.json()

            expect(resp.project.name).toBe(customProject)
            expect(resp.project.default_endpoint_settings.autoscaling_limit_min_cu)
                .toBe(defaultMinScaling)
            expect(resp.project.default_endpoint_settings.autoscaling_limit_max_cu)
                .toBe(defaultMaxScaling)
            expect(resp.project.pg_version).toBe(customPostgre)
            expect(resp.project.proxy_host).toBe(customHost)
            expect(resp.connection_uris[0].connection_uri).toContain(customHost)
            expect(resp.connection_uris[0].connection_parameters.database).toBe(customDbName)
            expect(resp.connection_uris[0].connection_parameters.role).toBe(defaultUser)
            expect(resp.connection_uris[0].connection_parameters.host).toContain(customHost)
            expect(resp.connection_uris[0].connection_parameters.pooler_host)
                .toContain(customHost)
            expect(resp.roles[0].name).toBe(defaultUser)
            expect(resp.databases[0].name).toBe(customDbName)
            expect(resp.databases[0].owner_name).toBe(defaultUser)
            expect(resp.branch.name).toBe(customBranchName)
            expect(resp.endpoints[0].host).toContain(customHost)
            expect(resp.endpoints[0].autoscaling_limit_min_cu).toBe(defaultMinScaling)
            expect(resp.endpoints[0].autoscaling_limit_max_cu).toBe(defaultMaxScaling)
            expect(resp.endpoints[0].region_id).toBe(customRegion)
            await expect(page.locator('[data-qa=create_project_success]')).toBeVisible()
            await expect(page.getByText('Connection details for your new project')).toBeVisible()
            await expect(page.getByText(`Project ${customProject} with database`
            + ` ${customDbName} was created successfully.`)).toBeVisible()
            await expect(page.getByText(`Project ${customProject} with database`
            + ` ${customDbName} was created successfully.`))
                .toHaveCSS('color', 'rgb(31, 153, 96)')
            await expect(page.locator('circle').first()).toBeVisible()
            await expect(page.locator('[data-qa=create_project_success] > :nth-child(1) button'))
                .toBeVisible()
            await page.locator('[data-qa=create_project_success] > :nth-child(1) button').click()
            await expect(page.getByText(`Home/${customProject}`)).toBeVisible()
        })
})
