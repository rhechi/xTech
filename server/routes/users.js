const router = require('express').Router()
const User = require('../models/User')
const verify = require('../middleware/verifyToken')
const { updateUserDB , getByIdDB , searchDB } = require('../utils/dbHandler')

//user operations
//updateuser-----todo:add verification and satnitazation---maybe split updates---
router.put("/update",verify, async (req,res) =>{          
            if(!req.body.id){
            const currentID = req.jwt.id
            const update = req.body
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password,salt)
                } catch (error) {
                    return res.status(500).json(err)
                }
            }
            try {
                const user = await updateUserDB(currentID,update)
                res.status(200).json("Account updated")
            } catch (err) {
                console.log(err)
                res.status(500).json(err)
            }
        }
        else res.status(403).json("cannot modify ID")
        
    
})
//get a user
router.get("/:id",async(req,res)=>{

    const id = req.params.id
    try {
        //db call---------------
        const user = await getByIdDB(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete user
router.delete("/delete", verify, async(req,res)=>{
    try {
        const user = await User.deleteOne({id:req.user.id})
        res.status(200).json("Account deleted")
    } catch (err) {
        res.status(500).json("server error")
    }
})


router.get("/search/:string",verify,async(req,res) =>{
    try {
        const users  = await searchDB(req.params.string)
        console.log(users)
        if(!users){res.status(404).json({error: "no users found"})}else{
            const response = users.map(user=>(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture,
                    username: user.username,
                    id: user.id
                }
            ))
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error)
    }
})

module.exports = router