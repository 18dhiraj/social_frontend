import axios from 'axios';

let token = localStorage.getItem(process.env.REACT_APP_TOKEN) || null

let axiosinstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: process.env.REACT_APP_LIVE_URL,
    headers: {
        'authorization': token,
    }
})

const post = async (url, data, headers) => {
    return (
        await axiosinstance.post(url, data, headers)
    )
}

const upload = async (url, data) => {
    let headers = {
        'authorization': token,
        "Content-Type": "multipart/form-data"
    }
    return (
        await axiosinstance.post(url, data, headers)
    )

}

const get = async (url) => {
    let res = await axiosinstance.get(url)
    return res
}


export default { post, get, upload }