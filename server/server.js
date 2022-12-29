const express = require("express");
const app = express();
app.use(express.json());

const port = 8000;

app.listen(port, function () {
  console.log(`Server is up and Running on ${port}`);
});