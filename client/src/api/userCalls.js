

export const getFriendCall = async (payload)=>{
    const friendId = payload.friendId
    const user = payload.user
    try {
        // const res = await axios.get("/users/"+friendId, {
        //     headers: {auth: "Bearer "+user.accessToken}
        // })
        const  res = {};
        return res
    } catch (err) {
        console.log(err)
        return null;
    }
}