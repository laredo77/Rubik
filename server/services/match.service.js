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

module.exports = {
    setMatch,
    getMatchStatus,
};
