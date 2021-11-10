const User = require('../../models/User')

const getById = async (id) =>{
    try {
        console.log("finding")
        const res = await User.findOne({_id:id})
        if(res){return res}else{ throw "this user does not exist" }
    } catch (error) {
        console.log("source : dbHandler/getById",error)
        return {error}
    }
}

module.exports = getById