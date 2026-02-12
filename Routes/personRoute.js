const express = require("express");
const Router = express.Router();
const person = require("../Models/person.js");
// const passport = require("../auth.js");
// Router.use(passport.initialize());

const {jwtAuthMiddleware, generateToken} = require("./../jwt.js")

// const localAuthMiddleware =  passport.authenticate('local',{session:false});

Router.post("/signup",async (req, res)=>{
    try{//always use try catch bcz if any error happen we don't need to send it manually catch automatically send it to catch
        const data = req.body;
        const newPerson = new person(data);//create new person to the database
        const response = await newPerson.save();//save the new person to the databse using newPerson
        console.log("data saved");
        const payload = {
            id:response.id,
            username:response.username

        }
      
        const token = generateToken(payload);
        console.log("Token is:", token);
        res.status(200).json({value :response, tokenID: token});//sending response
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
Router.post('/login',async(req, res)=>{
    try{
        //Extract username and password from request body
        const {username, password} = req.body;
        //find the user by username
        const user = await person.findOne({username:username});
        
        // if user doesnot exist or password doesnot match return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        //generate token
        console.log("happy");
        
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);
        //return token as res
        res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"})
        
    }
})
Router.get("/", jwtAuthMiddleware ,async (req, res)=>{
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

//profile
Router.get("/profile", jwtAuthMiddleware, async(req, res)=>{
    try{
        const userData = req.user;
        console.log(userData);
        console.log(userData.id);
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"});
        
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

Router.put("/:id",async (req, res)=>{
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