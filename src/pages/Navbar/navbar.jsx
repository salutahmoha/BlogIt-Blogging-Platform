import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar.css';

function navbar() {
    const navigate = useNavigate()
    const handleStartWriting = () => {
        navigate('/RegisterUser')
    }
  return (
    <div className='navbar'>
        <div className="log">
            <h3>BlogIt</h3>
        </div>
        <div className="signIn-button">
            <button className='btn' onClick={handleStartWriting}>Sign In</button>
        </div>
    </div>
  )
}

export default navbar