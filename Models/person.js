const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
    },
    Mnumber : {
        type:String,
        required:true,
        unique:true
    },
     email : {
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["Chef", "Waiter", "Manager"],
        required:true
    }

})

const person = mongoose.model("person", personSchema);//creating a model of our above made schema
// Schema = rules
// Model = class created using those rules
// Document = object created from that class
module.exports = person;