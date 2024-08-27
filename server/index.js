const express = require("express");
const cors = require("cors");  // Import the cors package
const Users = require("./sample.json");
const fs = require("fs");
const { join } = require("path");

const app = express();
app.use(express.json());
const port = 8000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',  // only allow requests from this origin
  methods: ["GET", "POST", "PATCH", "DELETE"],

})); // Add the cors middleware to your Express app

// Display All Users

app.get("/Users", (req, res) =>{
    return res.json(Users);
});

// Delete User Detail

app.delete("/Users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filterdUsers = Users.filter((user) => user.id !== id);
  fs.writeFile("./sample.json",JSON.stringify(filterdUsers),(err, data)=>{
    return res.json(filterdUsers);
  });
});

// Add new User 
app.post("/users",(req,res)=>{
  let{name, age, city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message:"All Fields Requierd" });
  } 
  let id =Date.now();
  Users.push({id,name,age,city});

  fs.writeFile("./sample.json",JSON.stringify(Users),(err, data)=>{
    return res.json({"message": "User Detail Added Success"});  
  });
});


// Upadate User
app.patch("/users/:id",(req,res)=>{
  let id =Number(req.params.id);
  let{name, age, city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message:"All Fields Requierd" });
  } 

  let index=Users.findIndex((user)=> user.id==id);
  Users.splice(index,1,{...req.body})
  

  fs.writeFile("./sample.json",JSON.stringify(Users),(err, data)=>{
    return res.json({"message": "User Detail Updated Success"});  
  });
});


app.listen(port, (err) => {
    console.log(`App is running in port ${port}`);
});


