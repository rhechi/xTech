const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const { getByIdDBDB ,updateUserDB} = require('../utils/dbHandler')

router.get('/getContacts' ,verify,async(req,res) =>{
    const userId = req.jwt.id
    try {
        user = await getByIdDB(userId)
        if(user.error){throw user.error}
        res.status(200).json({contacts: user.contacts})
    } catch (error) {
        res.status(500).json({error})
    }

})

router.get('/getRequests',verify,async(req,res) =>{
    const userId = req.jwt.id
    try {
        ser = await getByIdDB(userId)
        if(user.error){throw user.error}
        res.status(200).json({requests: user.requests})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/sentRequests',verify,async(req,res) =>{
    const userId = req.jwt.id 
    try {
        user = await getByIdDB(userId)
        if(user.error){throw user.error}
        res.status(200).json({sentRequests: user.sentRequests})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/sendRequest',verify,async(req,res) =>{
    const userId = req.jwt.id 
    const contactId = req.body.contactId
    try {
        const user = await getByIdDB(userId)
        if(user.error){throw user.error}
        const contact = await getByIdDB(contactId)
        if(contact.error){throw contact.error}

        if(contact.request.includes(userId)){res.status(400).json({error: "Request Already sent"})}
        const requests = [...contact.requests,userId]
        const sentRequests = [...user.sentRequests,contactId]
        const newUser = await updateUserDB(userId,{sentRequests})
        if(newUser.error){throw newUser.error}
        const newContact = await updateUserDB(contactId,{requests})
        if(newContact.error){throw newContact.error}
        res.status(200).json({user: newUser})
    } catch (error) {
        res.status(500).json({error})
    }

})

router.post('/acceptRequest',verify,async (req,res)=>{
    const userId = req.jwt.id 
    const contactId = req.body.contactId
    try {
        const user = await getByIdDB(userId)
        if(user.error){throw user.error}
        const contact = await getByIdDB(contactId)
        if(contact.error){throw contact.error}
        if(!user.requests.includes(contatcId) || !contact.sentRequests.includes(userId))
        {res.status(404).json({error: "no request to accept"})};
        //setting new entries for the user and the contact and updating (below)
        const newUserContacts = [...user.contacts,contactId]
        const newUserRequests = user.requests.filter(r=>(r !== contactId))
        const newContactContacts = [...contact.contacts,userId]
        const newContactSentRequests = contact.sentRequests.filter(sr=>( sr !== userId))

        const newUser = await updateUserDB(userId,{
            contacts : newUserContacts,
            requests: newUserRequests
        })
        if(newUser.error){throw newUser.error}
        const newContact = await updateUserDB(contactId,{
            contacts: newContactContacts,
            sentRequests: newContactSentRequests
        })
        if(newContact.error){throw newContact.error}
        res.status(200).json({user: newUser})
    } catch (error) {
        res.status(500).json({error})
    }

})

module.exports = router;