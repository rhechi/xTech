//note to self: this whole idea is stupid on how to store messages !find alternative
const router = require('express').Router()
const User = require('../models/User')
const Message = require('../models/Message')
const verify = require('../middleware/verifyToken')
const { getMessagesDB , setMessageDB } = require('../utils/dbHandler')

//add
    router.post("/", async (req,res) =>{   
    try {     
        const savedMessage = await setMessageDB(req.body)       
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json(err)
    }
})


//get
router.get("/:convID", async(req,res) =>{
    try {
        const messages = await getMessagesDB(req.params.convID)
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;