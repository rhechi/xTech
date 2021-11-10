import { createSlice } from '@reduxjs/toolkit'
import { io } from "socket.io-client"

export const socketSlice = createSlice({
    name: 'socket',
    initialState:{
        current: io("ws://localhost:8000")
    },
    reducers:{
        setSocket : (state,action) =>{
            state.current = io(`${action.payload}`);
        }
    }
})

export const { setSocket } = socketSlice.actions
export default socketSlice.reducer