const express = require("express");
const Router = express.Router();
const person = require("../Models/person.js");
Router.post("/", async (req, res)=>{
    try{//always use try catch bc if any error happen we don't need to send it manually catch automatically send it to catch
        const data = req.body;
        const newPerson = new person(data);//create new person to the database
        const response = await newPerson.save();//save the new person to the databse using newPerson
        console.log("data saved");
        res.status(200).json(response);//sending response
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
Router.get("/", async (req, res)=>{
try{
const data = await person.find()
console.log("Data Fetched Successfully");
res.status(200).json(data);
}
catch(err){
 console.log(err);
 res.status(500).json({error:err.message});
}
})

Router.get("/:workType", async (req, res)=>{
    try{
        const workType = req.params.workType;//extract worktype from URL Parameters
        if(workType == "Chef" || workType == "Waiter" || workType == "Manager"){
            const data = await person.find({role:workType});
            console.log("Successfully Fetched!");
            res.status(200).json(data);
        }
        else{
            res.status(404).json("Invalid WorkType!");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})

Router.put("/:id", async (req, res)=>{
    try{
        const personId = req.params.id;
        const wannaDataUpdate = req.body;
        const response = await person.findByIdAndUpdate(personId, wannaDataUpdate, {
            new : true, //return updated document
            runValidators : true //run mongoose validators
        })
        if(!response){
            res.status(404).json("Invalid!");
        }
        console.log("data updated");
        res.status(200).json(response);
        
    }
    catch(err){
        res.status(500).json({error:err});
    }
})

Router.delete("/:id", async (req, res)=>{
    try{
        const personId = req.params.id;
        if(personId){
        const response = await person.findByIdAndDelete(personId);
        console.log("Deleted Successfully!");
        res.status(200).json(response);}
        else{
        console.log("Invalid Id");
        res.status(404).json(response);}
        }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
    })
module.exports = Router;