import { createSlice } from '@reduxjs/toolkit'
import {compareConv} from '../utils'
export const convSlice = createSlice({
    name:'conv',
    initialState:{
        current:[],
        active: null,
        loading: false,
        error:null,
    },
    reducers:{
        getConvsStart: (state)=>{
            state.loading = true
        },
        getConvsSuccess: (state,action) =>{
        state.loading = false
        state.current = action.payload.sort(compareConv)
        },
        getConvsFail: (state,action)=>{
            state.current.error = action.payload.error
        },
        updateConv : (state,action)=>{
            const convToUpdate = state.current.filter(e=>e.convId == action.payload.conversationID)[0]
            const upConv = {
                convId: convToUpdate.convId,
                friendId: convToUpdate.friendId,
                firstName: convToUpdate.firstName,
                convImg: convToUpdate.convImg,
                lastName: convToUpdate.lastName,
                lastMessage: action.payload
            }
            state.current = [upConv,...state.current.filter(e=>e.convId !== action.payload.conversationID)]
        },
        setCurrentConv: (state,action) =>{
            state.active = action.payload
        }
    }
})
export const { getConvsStart , getConvsSuccess , getConvsFail , updateConv ,setCurrentConv} = convSlice.actions
export default convSlice.reducer