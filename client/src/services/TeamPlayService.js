//const axios = require("axios");

export class TeamPlayService {
  static async initNewGame(gameDetails) {
    console.log(gameDetails);
    // const response = await axios.post("http://localhost:3001/", user);
    // if (response.status !== 200) return;
    // 1. call server with user details
    // 2. init in db new line with user details + desire level
    // 3. send back to user special code + password to join the game
  }

  static async joinGame(gameDetails, player) {
    console.log(gameDetails);
    console.log(player);
    // const response = await axios.get(`${BASE_URL}/auth/${id}/twitter`);
    // if (response.status !== 200) return;
    // window.location.replace(response.data); // itamar: redirct to twitter auth
    // return await response.data;
    // 1. call server with gameDetails, user nickname(player)
    // 2. add to db the player
  }

  static async teamPlayManager(gameDetails) {
    // 1. call server with gameDetails whenever state change
    // 2. show to all users that connected to the gameDetails the new state
  }
}

export default TeamPlayService;
