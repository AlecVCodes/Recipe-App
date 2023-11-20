import React, { useState } from 'react'

interface tooltip {
    text: any
}

function Tooltip({ text }: tooltip) {


    return (
        <div className="tooltip-container"

        >


            <div className="tooltip-text">{text}</div>

        </div>
    )
}

export default Tooltip