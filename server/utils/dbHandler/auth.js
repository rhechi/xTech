
const regsiter = async (payload) =>{
    try {
        const user = await new User(payload)
        const res = await user.save()
        return res
    } catch (err) {
        console.log("source: DbHandler/register",err)
        return null
    }
    }
