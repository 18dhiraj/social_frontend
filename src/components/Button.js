import React, { useEffect, useState } from "react";
import config from '../utills/config.json'

const Button = (props) => {

    const { title = 'title', onClick, loading } = props
    const [loader, setLoader] = useState(false)
    const {primaryColor} = config

        useEffect(() => {
            setLoader(loading)
        }, [loading])

    return (
        <div className="border bg-[blue] cursor-pointer text-white px-5 py-2 rounded shadow  hover:bg-[skyblue] text-center " onClick={onClick}>{loader ? "Loading..." : title}</div>
    )
}

export default Button