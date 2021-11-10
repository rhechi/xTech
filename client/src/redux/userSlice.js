import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        login:{
            info:null,
            /*{
                id: null,
                accessToken: null,
                refreshToken: null,
                error: null
                
            },*/
            loading: false,

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
            state.login.info.error = action.payload.error
            state.login.loading = false
        }
    }
})

export const { loginStart , loginSuccess , loginFail } = userSlice.actions
export default userSlice.reducer