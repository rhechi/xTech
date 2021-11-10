const getConvs = async (id) => {
     
    try {
        const res = await Conv.find({members : {$in:id}})
        return res
    } catch (err) {
        console.log("source: dbHandler/getConvs",err)
        return null
    }
    }

    const setConv = async (members) => {
        const conv = new Conv( members )
        try {
            const res = await conv.save()
            return res
        } catch (err) {
            console.log(err)
            return null
        }
        }