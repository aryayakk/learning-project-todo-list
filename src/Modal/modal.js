import React, { useState } from 'react'

const Modal = ({closeButton}) => {

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <button onClick={() => closeButton(false)}>X</button>
                <div className='title'>
                    <h2> THINGS TO DO</h2>
                </div>
                <div className='body'>

                </div>
                <div className='footer'>
                    <button onClick={() => closeButton(false)}>close</button>
                    <button>edit</button>
                    <button>Let's do it!</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
