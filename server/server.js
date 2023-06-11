const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const dotenv = require("dotenv");
const path = require("path");
const database = require("../server/database");
const {getCubeDefinitionFromGPT} = require("./services/game.service");

dotenv.config();
process.env.PWD = process.cwd();

const app = express();

// Middleware: JSON parsing and Cross-Origin Resource Sharing (CORS)
app.use([express.json(), cors()]);

// Serve static files from the client/build directory
app.use(express.static(path.join(process.env.PWD + "/client/build")));

// Mount the router for handling routes
app.use("/", router);

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, function () {
    console.log(`Server is up and Running on ${port}`);
});
