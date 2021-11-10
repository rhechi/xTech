import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import registerReducer from "./registerSlice";
import convReducer from './convSlice'
import messageReducer from './messageSlice'
import socketReducer from './socketSlice'
import contactsReducer from './contactsSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        register: registerReducer,
        conv: convReducer,
        message: messageReducer,
        socket: socketReducer,
        contacts: contactsReducer
    }
})
