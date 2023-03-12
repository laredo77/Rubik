//const userDB = require("../repository/userDOAService.js");

const addUser = async (user) => {
  console.log("should add to db the user: ", user.email);
  return { email: "user-added" };
  // const userFromDB = await getUser(user.id);
  // if (userFromDB.length) {
  //   return userFromDB;
  // } else {
  //   const addedUser = await userDB.addUser(user);
  //   return addedUser;
  // }
};

module.exports = {
  addUser,
};
