import React from "react";

const InputFields = (props) => {

    const { title = 'undefined', value, onChange = null, dataKey, type = 'text' } = props

    return (
        <div className="border rounded mb-5 mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '5px 20px' }}>
            <label className="font-bold">{title}</label>
            <input className="p-2 focus:border-0 outline-0 w-full" type={type} value={value} onChange={(e) => onChange(dataKey, e.target.value)} />
        </div>
    )
}

export default InputFields