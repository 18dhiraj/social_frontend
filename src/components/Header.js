import React from "react";
import { useNavigate } from "react-router";
import { logoutuser } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.userData)

    const logout = () => {
        dispatch(logoutuser())
        localStorage.removeItem('socialtoken')
        navigate('/login')
    }

    return (
        <nav className="py-4  sticky top-0  w-auto bg-[white] z-10">
            <div className='p-4 text-3xl bg-[white]'>Welcome back {user?.name || "user"}!</div>
        </nav>
    )
}

export default Header