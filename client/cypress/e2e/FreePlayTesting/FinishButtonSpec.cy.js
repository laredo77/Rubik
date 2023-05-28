describe('My App', () => {
    it('should navigate to the app and perform the desired actions', () => {
        // Visit the app URL
        cy.visit('http://localhost:3000/');

        // Click the temp_button
        cy.get('#temp-button').click();

        // Click the free game option
        cy.contains('Free Game').click();

        cy.get('#a40').click();
        cy.wait(300);
        cy.get('#a31').click();
        cy.wait(300);
        cy.get('#a70').click();
        cy.wait(300);
        cy.get('#az0').click();
        cy.wait(1000);
        cy.get('#finish-button').click();
        cy.wait(1000);
        cy.contains('OK').click();
        cy.get('#az1').click();
        cy.wait(300);
        cy.get('#a71').click();
        cy.wait(300);
        cy.get('#a30').click();
        cy.wait(300);
        cy.get('#a41').click();
        cy.wait(300);
        cy.get('#finish-button').click();
        cy.wait(1000);
        cy.contains('OK').click();
        cy.wait(300);
        cy.visit('http://localhost:3000/');
    });
});
