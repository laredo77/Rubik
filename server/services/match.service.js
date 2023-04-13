const setMatch = async (matchDetails) => {
    //should generate match id and password
    return { gameId: "g67s", password: "a6"};
};


const getMatchStatus = async (manager) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ status: 200 });
        }, 5000);
    });
};

const matchState = async (manager) => {
    let amountOfSteps = 2; // should be depended on level
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

module.exports = {
    setMatch,
    getMatchStatus,
    matchState,
};
