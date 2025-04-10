import React from 'react'
import './style.css'

const index = ({parentStyle, boxStyle}) => {
    return (
        <div style={parentStyle} className='logo'>
            <div className='rect-box' style={boxStyle}></div>
            LOGO
        </div>
    )
}

export default index