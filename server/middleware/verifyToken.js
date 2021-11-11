
const jwt = require("jsonwebtoken")

const verify = (req,res,next) =>{
    // console.log("source: verifyMiddleware",req.body)
    if(req.headers.auth){
        const token = req.headers.auth.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET, (err,payload) =>{
            if(err){
                
                return res.status(403).json("invalid token") 
            }
        req.jwt = payload
        next()
        })
    }else{
        res.status(401).json("no authorization")
    }
}

module.exports = verify