const getMessages = async (conversationID) => {
    try {
     
        const res = await Message.find({conversationID})
        return res
    } catch (err) {
        console.log("source: dbHandler/getMessages",err)
        return null
    }
    }

    
    const setMessage = async (message) => {
        const msg = new Message(message)
        try {
            const res = await msg.save()
            return res
        } catch (err) {
            console.log("source: dbHandler/setMessage",err)
            return null
        }
        }