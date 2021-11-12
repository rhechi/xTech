import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name : 'register',
    initialState: {
        success: false,
        loading: false,
    },
    reducers: {
        registerStart: (state) => {
            state.loading = true
        },
        registerSuccess: (state,action)=>{
            state.success = action.payload
            state.loading = false
        },
        registerFail: (state) =>{
            state.success =  false
            state.loading = false
        }
    }
})

export const { registerStart , registerSuccess , registerFail } = registerSlice.actions
export default registerSlice.reducer