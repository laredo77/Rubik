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

    static async getLeaderBoard() {
        const response = await axios.get("http://localhost:3001/user/leaderboard", {});
        if (response.status === 200)
            return response;
    }
}

export default GeneralServices;
