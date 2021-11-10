const router = require('express').Router()
const User = require('../models/User')
const verify = require('../middleware/verifyToken')
const { updateUserDB , getByIdDB } = require('../utils/dbHandler')


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
                //db call-------------------
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
//add a contact/friend 
router.put("/add/?username",verify,async(req,res) =>{
    const currentID = req.user.id
    res.status(200).json("request sent")
})
//accept a contact/friend
router.put("/acceptContact/?username",verify,async (req,res) =>{
    const currentID = req.user.id
    res.status(200).json("request sent")
})
//remove a contatct/friend
router.put("/unfriend/?username",verify,async (req,res) =>{
    const currentID = req.user.id
    res.status(200).json("request sent")
})
//join a room
//leave a room

module.exports = router