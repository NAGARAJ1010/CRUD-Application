const express = require("express");
const users = require("./sample.json");
const app = express();
const cors = require("cors");
const port = 8000;
app.use(cors());
//Display all users
app.get("/users", (req, res) => {
  console.log("User details get");
  return res.json(users);
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
