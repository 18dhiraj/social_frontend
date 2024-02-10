import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import extraSlice from './reducers/extraSlice'
import postSlice from './reducers/postSlice'

export const store = configureStore({
    reducer: { user: authSlice, extra: extraSlice, posts: postSlice },
})