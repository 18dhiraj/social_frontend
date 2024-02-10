import { createSlice } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState = {
    show: false,
    message: null,
    type: ""
}


export const extraSlice = createSlice({
    name: "extraSlice",
    initialState,
    reducers: {
        setAlert: (state, action) => {
            // alert(action.payload)
            state.show = true;
            state.message = action.payload.data.message;
            state.type = action.payload.data.type;
        },
        hideAlert: (state) => {
            state.show = false;
            state.message = null;
            state.type = ''
        }
    }
})

export const { setAlert, hideAlert } = extraSlice.actions
export default extraSlice.reducer