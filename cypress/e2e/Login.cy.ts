describe('template spec', () => {
	it('user should be able to log in', () => {
		cy.visit('/');

		// fill in the form
		cy.get('input[type="email"]').type('test@test.com');
		cy.get('input[type="password"]').type('test');

		// submit the form
		cy.get('button').contains('Login').click();
		cy.url().should('contain', '/dashboard');
		cy.contains('Hello World');
	});
});