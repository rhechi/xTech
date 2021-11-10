const getByEmail = async (email) =>{
    try {
        const res = await User.findOne({email:email})
        return res
    } catch (err) {
        console.log("source: dbHandler/getByEmail",err)
        return null
    }
}


const getById = async (id) =>{
    try {
        const res = await User.findOne({_id:id})
        return res
    } catch (err) {
        console.log("source : dbHandler/getById",err)
        return null
    }
}


const updateUser = async (id,update) =>{
    try {
        const res = await User.findOneAndUpdate({id:id},{$set:update})
        return res
        
    } catch (err) {
        console.log("source: dbHandler/updateuser",err)
        return null
    }
}