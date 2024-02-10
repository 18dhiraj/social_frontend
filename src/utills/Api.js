import axios from 'axios';


const post = async (url, data) => {

    let token = localStorage.getItem(process.env.REACT_APP_TOKEN) || null
    let headers = {
        'authorization': token,
    }

    return (
        await axios.post(process.env.REACT_APP_LIVE_URL + url, data, { headers })
    )
}

const upload = async (url, data) => {

    let token = localStorage.getItem(process.env.REACT_APP_TOKEN) || null
    let headers = {
        'authorization': token,
        "Content-Type": "multipart/form-data"
    }
    return (
        await axios.post(process.env.REACT_APP_LIVE_URL + url, data, { headers })
    )

}

const get = async (url) => {

    let token = localStorage.getItem(process.env.REACT_APP_TOKEN) || null
    let headers = {
        'authorization': token,
    }

    return await axios.get(process.env.REACT_APP_LIVE_URL + url, { headers })
}


export default { post, get, upload }