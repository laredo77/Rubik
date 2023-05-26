describe('My App', () => {
    it('should navigate to the app and perform the desired actions', () => {
        // Visit the app URL
        cy.visit('http://localhost:3000/');

        // Click the temp_button
        cy.get('#temp-button').click();

        // Click the free game option
        cy.contains('Free Game').click();

        // Click the easy shuffle button
        cy.get('#easy-shuffle-button').click();

        // Wait for 7 seconds
        cy.wait(7000);

        // Click the easy shuffle button
        cy.get('#hint-button').click();
    });
});
