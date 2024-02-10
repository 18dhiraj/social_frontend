import React, { useState, useEffect } from "react";
import InputFields from "./InputFields";
import { useSelector } from "react-redux";

const EditProfile = ({ val, setEditModel }) => {

    const [fieldsValues, setFieldaVlaues] = useState({})
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.userData)


    const onChange = (k, v) => {

        let _data = { ...fieldsValues }
        _data[k] = v

        if (_data[k].trim() == '') {
            delete _data[k]
        }
        setFieldaVlaues(_data)
    }


    const handleEdit = () => {

    }

    useEffect(() => {

        setFieldaVlaues(user)

    }, [user])

    useEffect(() => {

        if (val) {
            document.getElementById('editprofile_moel').showModal()
            setEditModel(false)
        }

    }, [val])


    return (
        <dialog id="editprofile_moel" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="mt-4">
                        <InputFields title='Name' value={fieldsValues?.name || ""} dataKey={'name'} onChange={onChange} type="text" />
                        <InputFields title='Email' value={fieldsValues?.email || ""} dataKey={'email'} onChange={onChange} type="email" />
                        <div className="text-center" >
                            <button className="btn btn-primary w-1/2 mb-2 rounded-full" onClick={handleEdit}>{loading ? <span className="loading loading-dots loading-sm"></span> : "Update"}</button>
                        </div>
                    </div>
                </form>
                {/* <button class="btn btn-primary w-32 rounded-full" onClick={handleEdit}>{loading ? <span className="loading loading-dots loading-sm"></span> : "Post"}</button> */}
                <div className="text-end">
                </div>
            </div>
        </dialog>
    )
}

export default EditProfile