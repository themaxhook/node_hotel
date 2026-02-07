const mongoose = require("mongoose");
require("dotenv").config();
//const mongoUrl =   process.env.MONGODB_URL_LOCAL;//local mongoDB database setup
const mongoUrl = process.env.MONGODB_URL;//online mongoDB setup

mongoose.connect(mongoUrl)
// , {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// })


//db is a object or instance of connection class provided by mongoose
const db = mongoose.connection;//here mongoose.connection is a object or instance of connection class provided by mongoose and it represents active mongodb database commection bw nodejs server

//define Events Listeners for databse connection
db.on("connected", ()=>{
console.log("MongoDB server started");
})

db.on("disconnected", ()=>{
console.log("MongoDB server disconnected");
})

db.on("error", (err)=>{
    console.error("Error is ", err);
})

module.exports = db;