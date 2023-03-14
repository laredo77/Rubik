const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
process.env.PWD = process.cwd();

const app = express();

app.use([express.json(), cors()]);
app.use(express.static(path.join(process.env.PWD + "/client/build")));
app.use("/", router);

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Server is up and Running on ${port}`);
});
