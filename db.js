const mongoose = require("mongoose");

//const mongoUrl =   "mongodb://127.0.0.1:27017/hotels";//local mongoDB database setup
const mongoUrl = "mongodb+srv://bharatchhabra703:Axehook912@hotels.edxnnzy.mongodb.net/";//online mongoDB setup

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