import React, { useState } from "react";
import InputFields from "../../components/InputFields";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginsuccess } from "../../reducers/authSlice";
import Api from "../../utills/Api";
import { setAlert } from "../../reducers/extraSlice";

const Register = () => {

    const [fieldsValues, setFieldaVlaues] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (k, v) => {

        let _data = { ...fieldsValues }
        _data[k] = v

        if (_data[k].trim() == '') {
            delete _data[k]
        }
        setFieldaVlaues(_data)
    }

    const signup = (e) => {
        e.preventDefault();
        if (fieldsValues?.email && fieldsValues?.password && fieldsValues?.name) {
            let dataa = {
                "email": fieldsValues.email, "password": fieldsValues.password, "name": fieldsValues.name
            }
            setLoading(true)
            Api.post("/signup", dataa)
                .then((res) => {
                    if (res.data.success) {
                        localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.token)
                        dispatch(loginsuccess({ data: res.data.data, token: res.data.token }))
                        navigate('/')
                    } else {
                        dispatch(setAlert({ data: { message: res.data.message, type: "green" } }))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <div className="">

                <div className="text-2xl my-5 text-center">Register</div>
                <form className="shadow-lg rounded-lg mx-auto p-10 w-11/12 md:w-1/2 " onSubmit={signup} >
                    <InputFields title='Name' value={fieldsValues.name} dataKey={'name'} onChange={onChange} type="text" />
                    <InputFields title='Email' value={fieldsValues.email} dataKey={'email'} onChange={onChange} type="email" />
                    <InputFields title='Password' value={fieldsValues.password} dataKey={'password'} onChange={onChange} type="password" />
                    <div className="w-fit mx-auto" >
                        <button class="btn btn-primary w-64 rounded-full" onClick={signup}>{loading ? <span className="loading loading-dots loading-sm"></span> : "Signup"}</button>
                    </div>
                    <div className="mt-3  text-center">Already have an account? <span className="cursor-pointer font-bold" onClick={() => navigate('/login')} >login</span></div>
                </form>
            </div>
        </>
    )
}

export default Register