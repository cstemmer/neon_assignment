const form = 'form'
const advancedOptions = `${form} > :nth-child(5)`

module.exports = {
    pageHeading: '.Text_primary',
    form: form,
    projectNameLabel: `${form} [for=projectName]`,
    projectNameInput: `${form} #projectName`,
    postgresVersionLabel: `${form} [for=postgresVersion]`,
    postgresVersionInput: `${form} #postgresVersion_select .FormSelect__single-value`,
    resourcesText: `${form} > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)`,
    databaseNameLabel: `${form} [for=databaseName]`,
    databaseNameInput: `${form} #databaseName`,
    freeTierIcon: `${form} > :nth-child(3) svg g path`,
    freeTierTermsText: `${form} > :nth-child(3) p`,
    regionLabel: `${form} [for=region]`,
    regionInput: `${form} #region_select .FormSelect__input-container`,
    regionValue: `${form} #region_select .FormSelect__single-value`,
    moreOptionsButton: `${form} [type=button]`,
    submitButton: `${form} [type=submit]`,
    advancedOptions: advancedOptions,
    advanceOptionsHeader: `${advancedOptions} h2`,
    branchingText: `${advancedOptions} > :nth-child(1) > :nth-child(1) > :nth-child(2)`,
    primaryBranchLabel: `${advancedOptions} [for=primaryBranchName]`,
    primaryBranchInput: `${advancedOptions} #primaryBranchName`,
    branchingTermsText: `${advancedOptions} > :nth-child(1) > :nth-child(1)`
    + ' > :nth-child(3) > :nth-child(2) > :nth-child(2)',
    branchingTermsLink: `${advancedOptions} a`,
    branchingTermsIcon: `${advancedOptions} > :nth-child(1) > :nth-child(1) > :nth-child(3)`
    + '  > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) path'
}
