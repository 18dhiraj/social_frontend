import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            // alert(action.payload)
            state.posts = action.payload.posts;
        },
        addPost: (state, action) => {
            state.posts = [action.payload.post, ...state.posts]
        }
    }
})

export const { setPosts, addPost } = postSlice.actions
export default postSlice.reducer