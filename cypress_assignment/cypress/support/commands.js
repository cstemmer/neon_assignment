import creationForm from '../objects/create_project_page.obj'

Cypress.Commands.add('loginFE', (email, password) => {
    cy.visit('')
    cy.get('[data-qa=auth-button_github]').click()
    cy.get('#login_field').type(email)
    cy.get('#password').type(password)
    cy.get('[type=submit]').click()
})

Cypress.Commands.add('cleanup', () => {
    // cleanup project for next test
    cy.visit('')
    cy.get('[data-qa=project-actions]').click()
    cy.get('[data-qa=project-settings-link]').click()
    cy.get('[data-qa-id=delete]').click()
    cy.get('[data-qa=delete-project-button]').click()
    cy.get('[data-qa=confirmation_confirm_button]').click()
    cy.get(creationForm.pageHeading).should('be.visible')
        .and('have.text', 'Create project')
})
