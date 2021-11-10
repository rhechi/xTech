const addToken = async (token) => {
    const newToken = new Token({token})
    try {
        const res = await newToken.save()
        return res
    } catch (err) {
        console.log(err)
        return null
    }
    }

    const deleteToken = async (token) => {
        try {
            const res = await Token.findOneAndDelete(token)
            return res
        } catch (err) {
            console.log(err)
            return null
        }
        }

        
        const getToken = async (token) => {
            try {
                const res = await Token.findOne({token})
                if(res){return true}else{return null}
                } catch (err) {
                console.log(err)
                return null
            }
            }
   