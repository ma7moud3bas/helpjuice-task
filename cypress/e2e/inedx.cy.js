describe('index page', () => {

  // visit local host before any test
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('renders page', () => {
    cy.contains('Front-end developer test project')
  })

  it("renders the block container", () => {
    cy.get('#blocks-container').should('exist')
  })

  it("types in the input field and checks the value", () => {
    cy.get('#blocks-container .list-block').type('test')
    cy.get('#blocks-container .list-block').should('have.text', 'test')
  })

  it("types in the input field, clicks enter, and a new block is created", () => {
    cy.get('#blocks-container .list-block').type('test{enter}')
    cy.get('#blocks-container .list-block').should('have.length', 2)
  })

  it("opens the options list", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
  })

  it("opens the options list and selects the first option (h1)", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
    cy.get('#blocks-container .list-block').type('{enter}')
    cy.get('#blocks-container .list-block').should('have.attr', 'data-type', "h1")
  })

  it("opens the options list and selects the second option (h2)", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
    cy.get('#blocks-container .list-block').type('{downarrow}{enter}')
    cy.get('#blocks-container .list-block').should('have.attr', 'data-type', "h2")
  })

  it("opens the options list and selects the third option (h3)", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
    cy.get('#blocks-container .list-block').type('{downarrow}{downarrow}{enter}')
    cy.get('#blocks-container .list-block').should('have.attr', 'data-type', "h3")
  })

  it("opens the options list, types h1, and the options get filtered", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
    cy.get('#blocks-container .list-block').type('h1')
    cy.get('#blocks-container .list-block #block-options-list .options [data-option-type]').should('have.length', '1')
  })

  it("opens the options list, types gibberish, and the options list is empty", () => {
    cy.get('#blocks-container .list-block').type("/")
    cy.get('#blocks-container .list-block #block-options-list').should('exist')
    cy.get('#blocks-container .list-block').type('asda')
    cy.get('#blocks-container .list-block #block-options-list .options [data-option-type]').should('have.length', '0')
  })
})