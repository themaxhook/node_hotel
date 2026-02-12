const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    //first check request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization)return res.status(401).json({error:'Token Not Found'})
    const token = req.headers.authorization.split(' ')[1];//extract the jwt token fron request headers , "Bearer(0)<-HTTP authentication scheme, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(1)<-this is token"

    if(!token)return res.status(401).json({error:"Unauthorised"});
    try{
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// verify the jwt token
        req.user = decoded//attach user information to the request object or we can say it is payload of that user
        next();
    }catch(err){
        console.error(err);
        req.status(401).json({error : "Invalid Token"});
    }
}

//Function to generate jwt token
const generateToken = (userData)=>{
    // generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:30000});
}
module.exports = {jwtAuthMiddleware, generateToken};