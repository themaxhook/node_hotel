const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;//based on username and password   
const person = require("./Models/person")


passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
    //authentication logic here
    try{
        console.log("Received Credentials!", USERNAME, password);
        const user = await person.findOne({username:USERNAME});
        if(!user){
            return done(null, false, {message:'Incorrect username.'});   
        }
        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch){
            return done(null, user);
        }
        else{
            return done(null, false, {message : 'Incorrect password.'});
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;//Export configured passport