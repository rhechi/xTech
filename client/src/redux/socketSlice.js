import { createSlice } from '@reduxjs/toolkit'
import { io } from "socket.io-client"

export const socketSlice = createSlice({
    name: 'socket',
    initialState:{
        current: null
    },
    reducers:{
      
    }
})

export const { setSocket } = socketSlice.actions
export default socketSlice.reducer