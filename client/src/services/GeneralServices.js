//const axios = require("axios");
import axios from "axios";

export class GeneralServices {
  static async addNewUser(user) {
    // console.log("calling server from client");
    // console.log(user);
    // {email: 'MyUser@gmail.com', isLoading: true, isError: false}
    const response = await axios.post("http://localhost:3001/user/", user);
    if (response.status !== 200) return;
  }

  static async initNewGame(gameDetails) {
    console.log(gameDetails);
    // const response = await axios.post("http://localhost:3001/", user);
    // if (response.status !== 200) return;
    // 1. call server with user details
    // 2. init in db new line with user details + desire level
    // 3. send back to user special code + password to join the game
  }
}

export default GeneralServices;
