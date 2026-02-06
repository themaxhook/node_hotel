const express = require("express");
const Router = express.Router();
const menu = require("../Models/menu.js");

//if no try catch then else if
Router.post("/", async (req, res)=>{
try{
    const data = req.body;
    const newMenu = new menu(data);
    const response = await newMenu.save();
    console.log("Data Saved");
    res.status(200).json(response);
}
catch(err){
console.log("Internal Server Error!");
res.status(500).json({error:err.message});

}
})

Router.get("/", async (req, res)=>{
try{
    const data = await menu.find();
    console.log("Got Menu");
    res.status(200).json(data);
    }
catch(err){
    console.log(err);
    res.status(500).json({ error: err.message });
}
})

Router.get("/:tasteType", async (req, res)=>{
try{
    const tasteType = req.params.tasteType;
    const data = await menu.find({taste:tasteType});
    // console.log("Got Menu");
    res.status(200).json(data);
    }
catch(err){
    console.log(err);
    res.status(500).json({ error: err.message });
}
})

module.exports = Router;