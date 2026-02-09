const express = require("express");
const db = require("./db");
require("dotenv").config();

//const person = require("./Models/person");
// const menu = require("./Models/menu");



const app = express();
const PORT = process.env.PORT || 3000;//if online server then PORT given else for local 3000 that's why || used
app.use(express.json());//same as app.use(bodyParser.json()) but for this we need to require it first




function logRequest(req, res, next){
console.log(`[${new Date().toLocaleDateString()}] Request Made to : ${req.originalUrl}`);
next();//move to next phase
}
app.use(logRequest);



app.get("/" ,(req, res)=>{
    res.send("welcome!");
})
//
const personRoute = require("./Routes/personRoute.js");
const menuRoute = require("./Routes/menuRoute.js");
const person = require("./Models/person.js");
app.use("/person", personRoute);
app.use("/menu", menuRoute);

//yo

app.listen(PORT, ()=>{
    console.log("Server Started!");
})
