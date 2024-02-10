import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputFields from "../../components/InputFields";
import { loginsuccess } from "../../reducers/authSlice";
import { useDispatch } from "react-redux";
import Api from "../../utills/Api";
import { setAlert } from "../../reducers/extraSlice";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fieldsValues, setFieldaVlaues] = useState({})
    const [loading, setLoading] = useState(false)

    const onChange = (k, v) => {
        let _data = { ...fieldsValues }
        _data[k] = v
        if (_data[k].trim() == '') {
            delete _data[k]
        }
        setFieldaVlaues(_data)
    }

    const login = (e) => {
        e.preventDefault();
        if (fieldsValues?.email && fieldsValues?.password) {
            let dataa = {
                "email": fieldsValues.email, "password": fieldsValues.password
            }
            setLoading(true)
            Api.post('/login', dataa)
                .then((res) => {
                    if (res.data.success) {
                        let set = localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.token)
                        dispatch(loginsuccess({ data: res.data.data, token: res.data.token }))
                        navigate('/')
                    } else dispatch(setAlert({ data: { message: res.data.message, type: "green" } }))

                })
                .catch((err) => {
                    dispatch(setAlert({ data: { message: 'login failed', type: "red" } }))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }


    return (
        <div className="" >
            <div className="text-2xl my-5 text-center">Sign in</div>
            <div className="" >
                <form className="shadow-lg rounded-lg mx-auto p-10 w-11/12 md:w-1/2 " onSubmit={login} >
                    <InputFields title='Email' value={fieldsValues.email} dataKey={'email'} onChange={onChange} type={'email'} />
                    <InputFields title='Password' value={fieldsValues.password} dataKey={'password'} onChange={onChange} type={'password'} />
                    <div className="w-fit mx-auto" >
                        <button class="btn btn-primary w-64 rounded-full" onClick={login}>{loading ? <span className="loading loading-dots loading-sm"></span> : "Login"}</button>
                    </div>
                    <div className=" mt-3 text-center">
                        <div className="">Don't have an account?<span className="font-bold cursor-pointer" onClick={() => navigate('/register')}> signup </span></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login