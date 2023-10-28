const modal = '[data-qa=create_project_success]'
const successModal = {
    modal: modal,
    modalHeader: `${modal} > :nth-child(1)`,
    successMessage: `${modal} > :nth-child(2) > :nth-child(1)`,
    successIcon: `${modal} > :nth-child(2) > :nth-child(1) svg`,
    closeButton: `${modal} > :nth-child(1) button`
}

module.exports = {
    successModal: successModal
}

