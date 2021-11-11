import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        login:{
            info: {
                id: window.localStorage.userId,
                accessToken: window.localStorage.accessToken,
                refreshToken: window.localStorage.refreshToken,
            },
        
            loading: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.loading = true
        },
        loginSuccess: (state, action)=>{
            //console.log("action.payload: " ,action.payload)
            state.login.info = action.payload
            state.login.loading = false
        },
        loginFail: (state, action) =>{
            state.login.error = action.payload.error
            state.login.loading = false
        },
        logout: (state) =>{
            state.login.info = null
        },
    }
})

export const { loginStart , loginSuccess , loginFail, logout } = userSlice.actions
export default userSlice.reducer