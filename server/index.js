const express = require("express");
const users = require("./sample.json");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
//Display all users
app.get("/users", (req, res) => {
  return res.json(users);
});

//Delete the selected user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredData = users.filter((user) => user.id !== id);
  fs.writeFile("./sample.json", JSON.stringify(filteredData), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ error: "Failed to update file" });
    }
    res.json(filteredData);
  });
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
