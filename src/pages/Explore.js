import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/MainContainer";
import Api from "../utills/Api";
import PostComponent from "../components/PostComponent";
import InputFields from "../components/InputFields";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../reducers/extraSlice";
import { addPost, setPosts } from "../reducers/postSlice";
import config from '../utills/config.json'
import TextArea from "../components/TextArea";

const Explore = () => {

    let token = localStorage.getItem('socialtoken') || null;
    const { errorColor, successColor, warningColor } = config

    const posts = useSelector(state => state.posts.posts)
    const user = useSelector(state => state.user.userData)
    const [selectedTab, setSelectedTab] = useState('m')
    const [file, setFile] = useState(null)
    const [fieldsValues, setFieldaVlaues] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [showImage, setShowImage] = useState(false)

    const inputRef = useRef()
    const dispatch = useDispatch()

    const onChange = (k, v) => {
        let _data = { ...fieldsValues }
        _data[k] = v
        if (_data[k].trim() == '') {
            delete _data[k]
        }
        setFieldaVlaues(_data)
    }


    const validate = () => {
    }

    const handlePost = () => {

        let isValid = validate()

        let formdata = new FormData();

        formdata.append("title", fieldsValues?.about || '')
        formdata.append("description", fieldsValues?.des || '')
        formdata.append("post", file)

        setLoading(true)
        Api.upload("/post/create", formdata)
            .then((res) => {
                if (res.data.success) {
                    setFieldaVlaues({ about: "", des: "" })
                    setFile(null)
                    setShowImage(false)
                    let _data = { ...res.data.data, userDetails: user }
                    dispatch(addPost({ post: _data }))
                    dispatch(setAlert({ data: { message: 'Posted successfully!', type: successColor } }))
                } else {
                    dispatch(setAlert({ data: { message: res.data.message, type: errorColor } }))
                }
            })
            .catch((err) => {
                dispatch(setAlert({ data: { message: 'Some error occured! Try Again!!', type: errorColor } }))
            }).finally(() => {
                setLoading(false)
            })

    }

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    };


    useEffect(() => {
        setLoadingPosts(true)
        Api.get("/post")
            .then((res) => {
                if (res.data.success) {
                    let reversed = res.data.data.reverse()
                    dispatch(setPosts({ posts: reversed }))
                } else {
                    dispatch(setAlert({ data: { message: res.data.message, type: errorColor } }))
                }
            })
            .catch((err) => {
                dispatch(setAlert({ data: { message: 'Some error occured! Try Again!!', type: errorColor } }))
            })
            .finally(() => [
                setLoadingPosts(false)
            ])
    }, [])

    const removefile = () => {
        setFile(null)
        setShowImage(false)
    }

    const openFilesInput = () => {
        inputRef.current.click()
    }

    useEffect(() => {
        if (file != null) {
            setShowImage(true)
            PreviewImage()
        }
    }, [file])

    return (
        // <MainContainer>
        <div>
            <div className="sticky top-0 pt-5 z-10">
                {/* <div className="p-2 text-center border bg-[skyblue] text-white">Explore</div> */}
                {/* <div className='  flex grid grid-cols-2'>
                        <div onClick={() => setSelectedTab("m")} className={`p-2 text-center  cursor-pointer ${selectedTab == 'm' ? 'border-2 border-indigo-200 bg-[skyblue]' : 'border bg-[white]'} `}>For you</div>
                        <div onClick={() => setSelectedTab("f")} className={`p-2 text-center  cursor-pointer ${selectedTab == 'f' ? 'border-2 border-indigo-200 bg-[skyblue]' : 'border bg-[white]'} `}>Following</div>
                    </div> */}
            </div>
            <div className="mt-4 shadow rounded-lg p-4 " >
                <div className="text-bold text-xl py-4 mb-4 ml-4  " >Hey! What is happening?</div>
                <InputFields title='About' value={fieldsValues.about} dataKey={'about'} onChange={onChange} />
                <TextArea title='' value={fieldsValues.des} dataKey={'des'} onChange={onChange} />
                {showImage &&
                    <div className="relative w-fit" >
                        <div onClick={removefile} className="cursor-pointer absolute w-5 h-5 right-0 rounded-full bg-[lightgray] shadow-lg flex justify-center items-center text-[10px]" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <img id="uploadPreview" style={{ width: "100px", height: "100px" }} />
                    </div>
                }
                {file == null &&
                    <div className="relative mb-4 h-8 w-fit">
                        <div onClick={openFilesInput} className="absolute cursor-pointer left-0 text-center border p-2 w-[200px] h-8 text-[10px]"  >Upload Image +</div>
                        <input id='post' ref={inputRef} className="hidden" type="file" accept="image/*" name="post" multiple={false} onChange={(e) => setFile(e.target.files[0])} />
                    </div>}
                <button onClick={handlePost} className="btn btn-primary w-32 rounded-full my-2" >{loading ? <span className="loading loading-dots loading-sm"></span> : "Post"}</button>
            </div>
            {posts.length > 0 ?
                <div>
                    {posts.map((e, i) => <PostComponent key={i} e={e} />)}
                </div>
                :
                loadingPosts ?
                    <div className="text-center mt-5"><span className="loading loading-dots loading-lg"></span></div> :
                    <div className="text-center mt-5">No posts</div>
            }
        </div>
        // </MainContainer>
    )
}

export default Explore