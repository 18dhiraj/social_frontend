import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { loginsuccess } from "./reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "./utills/Api";
import { hideAlert } from "./reducers/extraSlice";


const Navigation = () => {

    const isLogged = useSelector((state) => state.user.isLogged)
    const _alert = useSelector(state => state.extra)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        Api.get("/profile").then((res) => {
            if (res.data.success) {
                let token = localStorage.getItem(process.env.REACT_APP_TOKEN)
                dispatch(loginsuccess({ data: res.data.data, token: token }))
                navigate('/')
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (_alert?.show) {
            setTimeout(() => {
                dispatch(hideAlert())
            }, 5000)
        }
    }, [_alert])

    return (
        <>
            <div>
                {_alert?.show && <div style={{ backgroundColor: _alert.type }} className={`fixed right-10 top-10 w-64  p-4 shadow-lg px-4 rounded flex items-center justify-between z-[100]`}><span className="text-[20px]">{_alert.message}</span> <span className={`w-6 text-center h-6 cursor-pointer shadow-lg hover:bg-[${_alert.type}] rounded-lg`} onClick={() => dispatch(hideAlert())}>x</span> </div>}

                {isLogged ?
                    <Home />
                    :
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/*" element={<Login />} />
                    </Routes>}
            </div>
        </>
    )

}

export default Navigation