import { createSlice } from '@reduxjs/toolkit'

export const searchUsersSlice = createSlice({
    name: "search",
    initialState:{
        current: [],
        loading:false,
        error: null,
    },
    reducers: {
        searchStart: (state) =>{
            state.loading = true
        },
        searchSuccess: (state,action) => {
            state.current = action.payload.users
            state.loading = false
        },
        searchError: (state,action) =>{
            state.error = action.payload.error
            state.loading = false
        }
    }

})
export const  { searchStart,searchSuccess,searchError } = searchUsersSlice.actions
export default searchUsersSlice.reducer