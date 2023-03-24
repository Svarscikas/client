import React, { Children } from 'react'
import "./modalStyle.css"
//Modal types:
const warning = {
    position : 'fixed',
    top: '50%',
    left: '50%',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'crimson',
    borderRadius: '0.5rem',
    padding: '1rem',
    zIndex: 1000,
}

export default function Modal({open, children, onClose}) {
  if(!open) return null
  return (
    <div className='wrapper'>
        <div className='content'>
            <svg className='flex-item'
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512">
                <path 
                    d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                    fill='white'/>
            </svg>
            <div className='flex-item'>
                Warning
            </div>
            <div className='flex-item'>
                {children}
            </div>   
            <button className="flex-item" onClick={onClose}>
                X
            </button>
            
        </div>
    </div>
  )
}
