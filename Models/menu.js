const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:["Spicy", "Sweet", "Sour"],
        required:true,
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingredients:{
        type:String,
        enum:[],
    },
    nums_sales:{
        type:Number,
        default:0,
    }

})

const menu = mongoose.model("menu", menuSchema);//creating model of above schema
module.exports = menu;
