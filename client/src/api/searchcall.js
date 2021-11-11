import axios from 'axios'
import { searchStart,searchSuccess,searchError } from '../redux/searchUsersSlice'

export const searchCall = async (payload,dispatch) =>{
    dispatch(searchStart())
    try {
        const user = payload.user
        const string = payload.string
        const res = await axios.get(`/users/search/${string}`,{
            headers: {
                auth: `Bearer ${user.accessToken}`
            }

        })
        const data = res.data
        if(data.error){throw data.error}
        dispatch(searchSuccess({users: data}))
        
    } catch (error) {
        dispatch(searchError({error}))
    }

    
}