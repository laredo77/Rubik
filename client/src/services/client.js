// const axios = require("axios");
//
// export class client {
//   static async signIn(user) {
//     const response = await axios.post(`${BASE_URL}/user`, user);
//     if (response.status !== 200) return;
//   }
//
//   static async logInWithTweeter(id) {
//     const response = await axios.get(`${BASE_URL}/auth/${id}/twitter`);
//     if (response.status !== 200) return;
//     window.location.replace(response.data); // itamar: redirct to twitter auth
//     return await response.data;
//   }
// }
//
// export default client;
