import axios from "axios";

describe('API tests', () => {
    // GET REQUESTS
    it('should make a GET request to the API', () => {
        cy.request('GET', 'http://localhost:3001/match/getInitMatchMoves')
            .its('status')
            .should('equal', 200);

        cy.wait(1000)
    });
});

describe('API tests', () => {
    // POST REQUESTS
    it('should make a POST request to the API', () => {
        cy.request('POST', 'http://localhost:3001/user/', {
            // Request body or payload
            email: 'MyUser@gmail.com',
            isLoading: true,
            isError: false
        }).then((response) => {
            // Assertion on the response
            expect(response.status).to.equal(200);
        });
        cy.wait(1000)

        cy.request('POST', 'http://localhost:3001/match/joinMatch', {
            // Request body or payload
            gameId: 'abc',
            password: 'abc',
            user: 'MyUser@gmail.com',

        }).then((response) => {
            // Assertion on the response
            expect(response.status).to.equal(200);
            //expect(response.body).to.have.property('id');
        });

    });
});
