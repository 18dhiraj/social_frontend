import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Api from "../utills/Api";
import EditProfile from "../components/EditProfile";
import PostComponent from "../components/PostComponent";
import { setAlert } from "../reducers/extraSlice";
import { setPosts } from "../reducers/postSlice";
import config from '../utills/config.json'
const Account = () => {

    const { primaryColor, warningColor, errorColor, successColor } = config
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const [editModel, setEditModel] = useState(false)
    const [filtering, setFiltering] = useState(true)
    const [loadingPosts, setLoadingPosts] = useState(false)
    const user = useSelector(state => state.user.userData)
    const posts = useSelector(state => state.posts.posts)
    const [deleting, setDeleting] = useState(null)

    const handleupdate = (e) => {
        e.preventDefault()
        setLoading(true)
        setLoading(false)
    }


    const deletePost = (id) => {
        setDeleting(id)
        Api.post('post/delete', { id: id })
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
    }

    useEffect(() => {
        setLoadingPosts(true)
        Api.get("/post")
            .then((res) => {
                if (res.data.success) {
                    let datas = []
                    let reversed = res.data.data.reverse()

                    reversed.map((e) => {
                        if (e.user._id == user._id) {
                            datas.push(e)
                        }
                    })
                    dispatch(setPosts({ posts: datas }))
                    setFiltering(false)

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
                <div className=" mx-auto bg-[gray] w-40 h-40 border rounded-full overflow-hidden" >
                    <img src={require('../assets/user.jpg')} height={"100%"} width={'100%'} />

                </div>
                <div className="my-2">
                    <div className="text-xl font-bold" >{user?.name || "bot"}</div>
                    <div>{user?.email || "bot"}</div>
                </div>
                {/* <div className="flex justify-end" >
                    <button className="btn btn-primary rounded-full w-32" onClick={() => setEditModel(true)} >Edit</button>
                </div> */}
            </div>

            <div className="flex items-center">

            </div>
            <div>
                <div className="border text-xl my-4 p-2">Posts</div>
                {posts.length > 0 && !filtering
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