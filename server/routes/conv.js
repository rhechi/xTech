const router = require('express').Router()
const User = require('../models/User')
const Conv = require('../models/Conv')
const verify = require('../middleware/verifyToken')
const { getConvsDB , setConvDB, getLastMessageDB } = require('../utils/dbHandler')

//new conv---------add validation and verify
router.post("/",async(req,res) =>{
    const newConv = {
        members:[req.body.senderID,req.body.recieverID]
    }
    try {
        //dbcall------------
        const savedConv = await setConvDB(newConv)

        savedConv ? res.status(200).json(savedConv) :  res.status(500).json("error")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get conv of a user

router.get("/" , verify,async (req,res) =>{
    
    const currentID = req.jwt.id
    //console.log("id src router:" ,currentID)
    try {
        //dbCall-------------
        const conv = await getConvsDB(currentID)

        //console.log("response from server", conv)
        res.status(200).json(conv)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get last message of a conv
// router.get("/lastMessage" , verify,async (req,res) =>{
router.get("/lastMessage/:convId" , async (req,res) =>{
    console.log("conversation id:" , req.params.convId)
    // const currentID = req.jwt.id
    try {
        //dbCall-------------
        const lastMessage = await getLastMessageDB(req.params.convId)
        console.log("response from server", lastMessage)
        res.status(200).json(lastMessage[0])
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;