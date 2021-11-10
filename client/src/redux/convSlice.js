import { createSlice } from '@reduxjs/toolkit'

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
        state.current = action.payload
        },
        getConvsFail: (state,action)=>{
            state.current.error = action.payload.error
        },
        addConv : (state,action)=>{
            state.current.convs = [...state.current.convs,action.payload]
        },
        setCurrentConv: (state,action) =>{
            state.active = action.payload
        }
    }
})
export const { getConvsStart , getConvsSuccess , getConvsFail , addConv ,setCurrentConv} = convSlice.actions
export default convSlice.reducer