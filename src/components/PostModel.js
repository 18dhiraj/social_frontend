import React, { useEffect, useRef, useState } from "react";
import InputFields from "./InputFields";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../reducers/extraSlice";
import Api from "../utills/Api";
import { addPost } from "../reducers/postSlice";
import config from "../utills/config.json";
import TextArea from "./TextArea";

const PostModel = ({ val, setPostModel }) => {

    const [fieldsValues, setFieldaVlaues] = useState({})
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const [showImage, setShowImage] = useState(false)
    const { errorColor, successColor, warningColor } = config
    const user = useSelector(state => state.user.userData)
    const inputRef = useRef()

    const onChange = (k, v) => {
        let _data = { ...fieldsValues }
        _data[k] = v
        if (_data[k].trim() == '') {
            delete _data[k]
        }
        setFieldaVlaues(_data)
    }

    const handlePost = () => {

        if (fieldsValues?.about.trim() != '' && fieldsValues?.des.trim() != "") {

            let formdata = new FormData();

            formdata.append("title", fieldsValues?.about || '')
            formdata.append("description", fieldsValues?.des || '')
            formdata.append("post", file)

            setLoading(true)

            Api.upload('/post/create', formdata)
                .then((res) => {
                    if (res.data.success) {
                        let _data = { ...res.data.data, userDetails: user }
                        dispatch(addPost({ post: _data }))
                        dispatch(setAlert({ data: { message: 'Posted Successfully!', type: successColor } }))
                    } else {
                        dispatch(setAlert({ data: { message: res.data.message, type: errorColor } }))
                    }
                })
                .catch((err) => {
                    dispatch(setAlert({ data: { message: 'failed to post!', type: errorColor } }))
                }).finally(() => {
                    setLoading(false)
                    setFieldaVlaues({})
                    setFile(null)
                    setShowImage(false)
                    setAlert(false)
                })
        } else {
            dispatch(setAlert({ data: { message: 'Fill all the fields!', type: errorColor } }))
        }

    }


    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);

        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    };

    const removefile = () => {
        setFile(null)
        setShowImage(false)
    }

    const openInput = () => {
        inputRef.current.click()
    }

    useEffect(() => {
        if (file != null) {
            setShowImage(true)
            PreviewImage()
        }
    }, [file])

    useEffect(() => {

        setFieldaVlaues({})
        setFile(null)
        setAlert(false)
        if (val) {
            document.getElementById('my_modal_3').showModal()
            setPostModel(false)
        }

    }, [val])

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="mt-4">
                        <InputFields title='About' value={fieldsValues?.about || ""} dataKey={'about'} onChange={onChange} />
                        <TextArea title='' value={fieldsValues.des} dataKey={'des'} onChange={onChange} />
                        {showImage &&
                            <div className="relative w-fit" >
                                <div onClick={removefile} className="cursor-pointer absolute w-5 h-5 right-1 top-1 rounded-full bg-[gray] shadow-lg flex justify-center items-center text-[10px]" >
                                    x
                                </div>
                                <img id="uploadPreview" style={{ width: "100px", height: "100px" }} />
                            </div>
                        }
                        {file == null ? <div className="relative mb-4 h-8">
                            <div onClick={openInput} className="absolute cursor-pointer left-0 text-center border p-2 w-[200px] h-8 text-[10px]"  >Upload Image +</div>
                            <input id='post' ref={inputRef} className="hidden" type="file" accept="image/*" name="post" multiple={false} onChange={(e) => setFile(e.target.files[0])} />
                        </div> : <img src={file.uri} />}
                    </div>
                    <button className="btn mt-5 btn-primary w-32 rounded-full" onClick={handlePost}>{loading ? <span className="loading loading-dots loading-sm"></span> : "Post"}</button>
                </form>
                <div className="relative mb-4 h-8">
                </div>
                <div className="text-end">
                </div>
            </div>
        </dialog>
    )

}

export default PostModel