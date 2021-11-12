import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name:'message',
    initialState:{
        current:{
            messages:[],
            error:{}
        },
        seen:false,
        loading: false
    },
    reducers:{
        getMessagesStart: (state)=>{
            state.loading = true
        },
        getMessagesSuccess: (state,action) =>{
        state.loading = false
        state.current.messages = action.payload.messages
        const length = action.payload.messages
        if(length>0){ state.seen = action.payload.messages[length-1].seen }
        },
        getMessagesFail: (state,action)=>{
            state.current.error = action.payload.error
        },
        addMessage : (state,action)=>{
            state.current.messages = [...state.current.messages,action.payload]
        },
        seeMessage : (state) =>{
            state.seen = true
        },
    }
})
export const { getMessagesStart , getMessagesSuccess , getMessagesFail , addMessage,seeMessage } = messageSlice.actions
export default messageSlice.reducer