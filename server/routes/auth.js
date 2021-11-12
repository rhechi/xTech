//todo: add jwtoken-----------------------------------------------------------------!important

const router = require('express').Router()
//const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { registerDB , getByEmailDB, addTokenDB, getTokenDB, deleteTokenDB } = require('../utils/dbHandler')
const verify = require('../middleware/verifyToken')
const { json } = require('express')


const accessTokenGen = (user) => {
    return  accessToken = jwt.sign({ id: user.id},
        process.env.JWT_SECRET,
        // { expiresIn:  "20m"}
        )
}
const refreshTokenGen = (user) => {
    return refreshToken = jwt.sign({ id: user.id,},
        process.env.JWT_REFRESH_SECRET,
       
        )
}

//refresh token 
router.post('/refresh', async (req,res)=>{
    try{
    const refreshToken = req.body.refreshToken
    if(!refreshToken) return res.status(401).json("no auth for you my man")
    const isToken = await getTokenDB(refreshToken)
    if(!isToken){return res.status(403).json("invalid token")}
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err,user) =>{
        if (err) { return res.status(403).json("ivalid token you hacker")}
         await deleteTokenDB(refreshToken)
        const newAccessToken = accessTokenGen(user)
        const newRefreshToken = refreshTokenGen(user) 
        addTokenDB(newRefreshToken)

        res.status(200).json(
            {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        )
    } )

}catch(error){
    console.log(error)
}
})




//Register User
router.post('/register', async (req,res) =>{
  console.log(req.body.username)
    try {
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        const newUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            profilePicture: `https://api.multiavatar.com/${req.body.username}.svg`
        }
        const user = await registerDB(newUser)
        if(user.error){throw "db error"}
         res.status(200).json(user) 
    } catch (error) {
        console.log(error)
        res.status(500).json({error}) 
    }

})

//login user
//!warning--shitty code here---needs update
router.post("/login", async (req,res) =>{
    let error = false
    
    try {
        //db call-----------------
        const user = await getByEmailDB(req.body.email)
        
        !user ? error = true : null
        if(!error){
        const checkPassword = await bcrypt.compare(req.body.password,user.password)
        !checkPassword ? error= true : null
        }       
        if(!error)  {   
           
            const accessToken = accessTokenGen(user)
            const refreshToken = refreshTokenGen(user)
            const addedRefreshToken = await addTokenDB(refreshToken)
            res.status(200).json({id:user.id,accessToken, refreshToken})
        }else res.status(403).json("email or password incorrent")
    } catch (err) {
     res.status(500).json(err) 
    }          
    })


    //logout------------------------------------------!important
    router.post("/logout",verify,async (req,res) =>{
        const refreshToken = req.body.refreshToken
        await deleteTokenDB(refreshToken)
        res.status(200).json("you're logged out ")
    })
    
    

module.exports = router