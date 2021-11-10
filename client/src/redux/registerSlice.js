import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name : 'register',
    initialState: {
        current:{
            success: false,
            firstName: null,
            email: null,
            error: null
            
        },
        loading: false,
    },
    reducers: {
        registerStart: (state) => {
            state.loading = true
        },
        registerSuccess: (state, action)=>{
            //console.log("action.payload: " ,action.payload)
            state.current = action.payload
            state.loading = false
        },
        registerFail: (state, action) =>{
            state.current.error = action.payload.error
            state.loading = false
        }
    }
})

export const { registerStart , registerSuccess , registerFail } = registerSlice.actions
export default registerSlice.reducer