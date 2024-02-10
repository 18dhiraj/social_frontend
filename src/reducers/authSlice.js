import { createSlice } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState = {
    isLogged: false,
    userData: null,
    token: ''
}


export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        loginsuccess: (state, action) => {
            // alert(action.payload)
            state.isLogged = true;
            state.userData = action.payload.data;
            state.token = action?.payload?.token || ''
        },
        logoutuser: (state) => {
            state.isLogged = false;
            state.userData = null;
            state.token = ''
        }
    }
})

export const { loginsuccess, logoutuser } = authSlice.actions
export default authSlice.reducer