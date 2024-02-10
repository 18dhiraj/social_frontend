import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutuser } from '../reducers/authSlice'
import { useNavigate } from 'react-router'
import MainContainer from '../components/MainContainer'
import Api from '../utills/Api'
import { Route, Routes } from "react-router-dom";

import Account from "./Account";
import Explore from "./Explore";
import PostModel from '../components/PostModel';
import { setAlert } from '../reducers/extraSlice';

const Home = () => {

    const user = useSelector(state => state.user.userData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [active, setActive] = useState("H")

    const [post, setPosts] = useState([])
    const [postModel, setPostModel] = useState(false)

    const logout = () => {
        dispatch(logoutuser())
        localStorage.removeItem(process.env.REACT_APP_TOKEN)
        navigate('/login')
    }

    useEffect(() => {
        Api.get("/post")
            .then((res) => {
                if (res.data.success) {
                    setPosts(res.data.data)
                } else {
                    dispatch(setAlert({ data: { message: res.data.message, type: "green" } }))

                }
            })
            .catch((err) => {
                dispatch(setAlert({ data: { message: 'Error occured!', type: "green" } }))
            })
    }, [])


    return (
        <MainContainer >
            <div className='grid grid-cols-4 relative gap-2'>
                <div className='flex flex-col justify-between sticky top-0 py-5 h-screen col-span-1 '>
                    <div className=' '>
                        <div className='font-bold text-2xl mb-3'>Social</div>
                        <button onClick={() => { navigate('/'); setActive("H") }} className={`btn  w-11/12 mb-2 rounded-full ${active == "H" && "border-2 border-blue-200"}`} >Home</button>
                        <button onClick={() => { navigate('/account'); setActive("P") }} className={`btn  w-11/12 mb-2 rounded-full ${active == "P" && "border-2 border-blue-200"}`} >Profile</button>
                        <button onClick={() => setPostModel(true)} className='btn btn-primary w-11/12 mb-2 rounded-full' >Post</button>
                    </div>
                    <div>
                        <div className='font-bold text-md m-3 overflow-hidden'>@{user.email}</div>
                        <button onClick={logout} className='btn btn-primary w-11/12 mb-2 rounded-full' >Logout</button>
                    </div>
                </div>
                <div className='col-span-3' >
                    {/* <Header /> */}
                    <Routes>
                        <Route path="/" element={<Explore />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/explore" element={<Explore />} />
                    </Routes>
                </div>
                <PostModel val={postModel} setPostModel={setPostModel} />
            </div>
        </MainContainer>
    )
}

export default Home



