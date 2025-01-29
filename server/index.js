const express = require("express");
const users = require("./sample.json");
const app = express();
app.use(express.json());
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


//Add user details
app.post("/users",(req,res)=>{
  let {name,age,city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message:"Fill all fields"});
  }
  let id = Date.now();
  users.push({id,name,age,city});

  fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
    return res.json({message:"User details added successfully..."});
  });
})

//Update user details
app.patch("/users/:id",(req,res)=>{
  let id = Number(req.params.id);
  let {name,age,city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message:"Fill all fields"});
  }
  let index = users.findIndex((user)=>user.id == id);
  users.splice(index,1,{...req.body});

  fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
    return res.json({message:"User details updated successfully..."});
  });
})

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
