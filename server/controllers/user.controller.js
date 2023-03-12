const userService = require("../services/user.service.js");

const addUser = async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send("User did not added");
  }
};

module.exports = {
  addUser,
};
