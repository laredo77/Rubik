describe('My App', () => {
    it('should navigate to the app and perform the desired actions', () => {
        // Visit the app URL
        cy.visit('http://localhost:3000/');

        // Click the temp_button
        cy.get('#temp-button').click();

        // Click the free game option
        cy.contains('Free Game').click();

        // Click the easy shuffle button
        cy.get('#medium-shuffle-button').click();

        // Add any assertions or further actions as needed
        // For example, you can verify that a certain element is visible after clicking the buttons
        // cy.get('#some_element').should('be.visible');
    });
});
