const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

personSchema.pre('save', async function() {
    const person = this;

    // 1. Only hash if password is new or modified
    if (!person.isModified('password')) return;

    try {
        // 2. Generate salt
        const salt = await bcrypt.genSalt(10);
        
        // 3. Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // 4. Override plain password with hashed one
        person.password = hashedPassword;
    } catch (err) {
        // If an error occurs, it will bubble up and stop the save
        throw err;
    }
});
const person = mongoose.model("person", personSchema);//creating a model of our above made schema
// Schema = rules
// Model = class created using those rules
// Document = object created from that class
module.exports = person;