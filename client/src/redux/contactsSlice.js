import { createSlice } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
    name:'contacts',
    initialState:{
        current: [],
        loading: false,
        error: null,
    },
    reducers:{
        getContactsStart: (state)=>{
            state.loading = true
        },
        getContactsSuccess: (state,action) =>{
            state.current = action.payload.contacts
            state.loading = false
        },
        getContactsFail: (state,action)=>{
           state.error = action.payload.error
           state.loading = false
        },
        addContacts : (state,action)=>{
        },
    }
})
export const { getContactsStart , getContactsSuccess , getContactsFail , addContacts } = contactsSlice.actions
export default contactsSlice.reducer