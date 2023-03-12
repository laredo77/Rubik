//const axios = require("axios");
import axios from "axios";

export class SinglePlayerServices {
  static async getLevelState(user) {
    // 1. ask server for level state depand on user choice
    // 2. server check in DB if user had level open and fetch its state.
    // 3. if not opened yet, create new row in DB and send new state to user
    const response = await axios.post("http://localhost:3001/user/", user);
    if (response.status !== 200) return;
  }
}

export default SinglePlayerServices;
