import axios from 'axios'
import { getContactsStart , getContactsSuccess , getContactsFail , addContacts } from '../redux/contactsSlice'

export const  getContactsCall = async (payload,dispatch) => {
    dispatch(getContactsStart())
    try {
        const res = axios.get('/contacts/getContacts',{
            headers:{
                auth: `Bearer ${payload.accessToken}`
            }
        })
        if(!res){throw "Cannot load contacts"}
        if(res.error){throw res.error}
        const contacts = res.data.contacts
        dispatch(getContactsSuccess({contacts}))
    } catch (error) {
        dispatch(getContactsFail({error}))
    }
    
}
