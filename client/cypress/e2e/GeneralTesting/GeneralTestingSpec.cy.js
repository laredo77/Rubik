describe('My App', () => {
    it('should navigate to the app and perform the desired actions', () => {
        // Visit the app URL
        cy.visit('http://localhost:3000/');

        // Click the temp_button
        cy.get('#temp-button').click();
        cy.wait(500);
        // Click the free game option
        cy.contains('Free Game').click();
        cy.wait(2000);
        // Click the easy shuffle button
        cy.visit('http://localhost:3000/main');
        cy.wait(1000);
        cy.contains('Match Game').click();
        cy.wait(2000);
        cy.contains('New Game').click();
        cy.wait(1000);
        cy.contains('Level-1').click();
        cy.wait(1500);
        cy.contains('OK').click();
        cy.wait(1500);
        // Click the easy shuffle button
        cy.visit('http://localhost:3000/main');
        cy.wait(1000);
        cy.contains('Competition Mode').click();
        cy.wait(1500);
        cy.contains('Level-1').click();
        cy.wait(1500);
        cy.contains('OK').click();
        cy.wait(1500);
        cy.wait(5000);
        cy.visit('http://localhost:3000/main');
        cy.wait(1000);
        cy.contains('Rubik Cube Algorithms').click();
        cy.wait(2000);
        cy.contains('Learn the basics').click();
        cy.wait(2000);
        cy.visit('http://localhost:3000/main');
    });
});
