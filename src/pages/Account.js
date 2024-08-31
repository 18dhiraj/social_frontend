import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Api from "../utills/Api";
import EditProfile from "../components/EditProfile";
import PostComponent from "../components/PostComponent";
import { setAlert } from "../reducers/extraSlice";
import config from '../utills/config.json'
import { loginsuccess } from "../reducers/authSlice";

const Account = () => {

    const { primaryColor, warningColor, errorColor, successColor } = config
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const uploadimageref = useRef();

    const [editModel, setEditModel] = useState(false)
    const [posts, setPosts] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(false)
    const user = useSelector(state => state.user.userData)
    const [deleting, setDeleting] = useState(null)
    const [uploadingImage, setImageUploading] = useState(false)

    const handleupdate = (e) => {
        e.preventDefault()
        setLoading(true)
        setLoading(false)
    }

    const openInput = () => {
        uploadimageref.current.click();
    }

    const uploadimage = (file) => {
        let formdata = new FormData();
        formdata.append("profileImage", file)
        setImageUploading(true)
        Api.upload('/profileimage', formdata).then((res) => {
            dispatch(loginsuccess({ data: res.data.data }))
        })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setImageUploading(false)
            })
    }


    const deletePost = (id) => {
        setDeleting(id)
        Api.post('/post/delete', { id: id })
            .then((res) => {
                if (res.data.success) {
                    let newDatat = posts.filter((e) => e._id !== id)
                    // setPosts(newDatat)
                    dispatch(setPosts({ posts: newDatat }))

                    dispatch(setAlert({ data: { message: "Delete successfully!", type: successColor } }))
                } else {
                    dispatch(setAlert({ data: { message: res.data.message, type: errorColor } }))
                }
            })
            .catch(() => {
                dispatch(setAlert({ data: { message: 'failed to delete the post!', type: errorColor } }))
            })
            .finally(() => {
                setDeleting(null)
            })
    }

    useEffect(() => {
        setLoadingPosts(true)
        Api.get("/post/user")
            .then((res) => {
                if (res.data.success) {
                    setPosts(res.data.data)
                } else {
                    dispatch(setAlert({ data: { message: res.data.message, type: errorColor } }))
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoadingPosts(false)
            })
    }, [])

    return (
        <div className="mt-20">
            <EditProfile setEditModel={setEditModel} val={editModel} />
            <div className="" >
                <div style={{ position: 'relative' }} className="w-40 mx-auto" >
                    <div className=" bg-[#eee] w-40 h-40 border rounded-full flex justify-content-center align-items-center overflow-hidden" style={{ position: 'relative' }} >
                        {uploadingImage ?
                            <div style={{ width: '160px', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                            : <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }} >
                                {user.image != null ? <img src={user.image} style={{ objectFit: 'contain' }} /> :
                                    <img src={require('../assets/user.jpg')} height={"100%"} width={'100%'} />}
                            </div>
                        }

                    </div>
                    <div onClick={openInput} style={{ width: '25px', height: '25px', position: 'absolute', right: 5, bottom: 25, backgroundColor: '#bbb', borderRadius: '50%', zIndex: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <input ref={uploadimageref} style={{ display: "none" }} type="file" accept="image/*" onChange={(e) => uploadimage(e.target.files[0])} />
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-4 h-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    <div className="text-xl font-bold" >{user?.name || "bot"}</div>
                    <div>{user?.email || "bot"}</div>
                </div>
            </div>

            <div className="flex items-center">

            </div>
            <div>
                {/* <div className="border text-xl my-4 p-2">Posts</div> */}
                {posts.length > 0
                    ?
                    posts.map((e, i) => {
                        return <PostComponent e={e} key={i} from={'account'} deletePost={deletePost} deleting={deleting} />
                    })
                    : loadingPosts ?
                        <div className="mt-5 text-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                        : <div className="mt-5 text-center">No Posts</div>
                }
            </div>
        </div>
    )
}

export default Account