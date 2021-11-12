import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import registerReducer from "./registerSlice";
import convReducer from './convSlice'
import messageReducer from './messageSlice'
import contactsReducer from './contactsSlice'
import searchReducer from './searchUsersSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        register: registerReducer,
        conv: convReducer,
        message: messageReducer,
        contacts: contactsReducer,
        search: searchReducer,
    }
})
