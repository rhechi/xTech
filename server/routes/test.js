const db = require('../utils/dbHandler/test')
const router = require('express').Router()

router.get('/',async(req,res) =>{
    const id = req.id
    try {
        const data = await db(id)
        if(data.error){throw data.error}else{ res.status(200).json(data) }
    } catch (error) {
        console.log(error)
       res.status(500).json(error)
    }
})

module.exports = router