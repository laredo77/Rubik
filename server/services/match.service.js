const setMatch = async (matchDetails) => {
    // should generate match id and password and record it in DB
    return {gameId: "g67s", password: "a6"};
};


const getMatchStatus = async (manager) => {
    // need to fix it such that its send status:200
    // only when its find in DB 2 players
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({status: 200});
        }, 5000);
    });
};

const matchState = async (manager) => {
    // the function should return from DB the moves the opponent did.
    // for now its just shuffle steps and send
    let amountOfSteps = 2;
    let movesArray = []
    let choices = new Array(8).fill(0);
    choices.push(1)
    choices.push(1)
    for (let i = 0; i < amountOfSteps; i++) {
        const randomElement = choices[Math.floor(Math.random() * choices.length)];
        let random_arrow, random_direction, choice;
        if (randomElement === 0) {
            random_arrow = Math.floor(Math.random() * 8);
            random_direction = Math.floor(Math.random() * 2);
            choice = "a" + random_arrow.toString() + random_direction.toString() + "1"
        } else {
            let rotateArrows = ["x", "y", "z"]
            random_arrow = Math.floor(Math.random() * 3);
            random_direction = Math.floor(Math.random() * 2);
            choice = rotateArrows[random_arrow] + random_direction.toString() + "1"
        }
        movesArray.push(choice)
    }
    return movesArray
};

const applyMove = async (move) => {
    // add to DB the move
    // return OK
    return "200OK"
};

const quit = async (user) => {
    // check in DB if the user is the manager if yes, close the game.
    // otherwise send the keep the manager waiting to new player and
    // the one who quit go back to home page..
    return "200OK"
};

module.exports = {
    setMatch,
    getMatchStatus,
    matchState,
    applyMove,
    quit,
};
