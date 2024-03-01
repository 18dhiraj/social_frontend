import React from "react";

const PostComponent = ({ e, from = 'home', deletePost, deleting = null }) => {

    return (
        <div className='my-3 border rounded p-4 '>
            <div className="flex items-center">
                <div className="border mr-3 h-10 w-10 rounded-full bg-[gray] overflow-hidden , flex justify-content-center align-items-center">
                    {e?.userDetails?.image ?
                        <img src={e.userDetails.image} height={"100%"} width={'100%'} style={{ objectFit: 'cover' }} />
                        :
                        <img src={require('../assets/user.jpg')} height={"100%"} width={'100%'} />
                    }
                </div>
                <div className="font-medium" >{e?.userDetails?.name ? e.userDetails.name : e?.user?.name || "bot"}</div>
                {/* <div>{JSON.stringify(e?.userDetails || '')}</div> */}
            </div>
            {
                <div className="flex justify-between">
                    <div className='font-medium text-lg mt-3' >{e?.title || ''}</div>
                    {from == 'account' && <div className='font-bold  mt-3 cursor-pointer' onClick={() => deletePost(e._id)}  >
                        {/* {JSON.stringify(deleting + " " + e._id)} */}
                        {
                            deleting == e._id ?
                                <span className="loading loading-spinner loading-sm"></span>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                        }
                    </div>}
                </div>
            }
            <div className='text-md mb-2 ' >{e?.description || ''}</div>
            {e?.image &&
                <div className="rounded-lg border sm:max-w-[300px] max-w-[100px] p-4 shadow " >
                    <img style={{objectFit:'contain'}} height={"100%"} width={'100%'}  src={e?.image} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = require('../assets/notloadeed.jpg');
                    }} />
                </div>
            }
        </div>
    )
}
export default PostComponent