describe('My App', () => {
    it('should navigate to the app and perform the desired actions', () => {
        // Visit the app URL
        cy.visit('http://localhost:3000/');
        cy.get('#temp-button').click();
        cy.wait(500);
        cy.contains('Competition Mode').click();
        cy.wait(1500);
        cy.contains('Level-1').click();
        cy.wait(1000);
        cy.contains('OK').click();
        cy.wait(7000);
        cy.contains('Finish').click();
        cy.wait(1000);
        cy.contains('OK').click();
        cy.wait(1500);
        cy.contains('Start Over').click();
        cy.wait(2000);
        cy.contains('Level-1').click();
        cy.wait(1000);
        cy.contains('OK').click();
        cy.wait(7000);
        cy.contains('Leaderboard').click();
        cy.wait(3000);
        cy.visit('http://localhost:3000/main');
    });
});
