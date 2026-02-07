const express = require("express");
const db = require("./db");
// const person = require("./Models/person");
// const menu = require("./Models/menu");
const app = express();
const PORT = 3000;
app.use(express.json());//same as app.use(bodyParser.json()) but for this we need to require it first
app.get("/", (req, res)=>{
    res.send("welcome!");
})
//
const personRoute = require("./Routes/personRoute.js");
const menuRoute = require("./Routes/menuRoute.js");
app.use("/person", personRoute);
app.use("/menu", menuRoute);

//yo

app.listen(PORT, ()=>{
    console.log("Server Started!");
})
