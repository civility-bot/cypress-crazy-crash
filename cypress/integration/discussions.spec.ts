context('Discussions in incognito', () => {
  it('upcoming discussion should have Sign up button, and anchor without email', () => {
    cy.request({
      url: Cypress.env('GRAPHQL_URL'),
      method: 'POST',
      body: { query: `{
        discussions(upcoming: true, limit: 1) {
          url
        }
      }` },
    }).then(res => {
      const disUrl = res.body.data.discussions[0].url;
      console.log(disUrl);
      cy.visit(disUrl);
      cy.get('.discussion-full button').contains('Sign me up');
    });

    // Anchor and no email
    cy.get('.discussion-full')
      .should('contain', 'Anchor')
      .and('not.contain.text', '@');
  });

});
