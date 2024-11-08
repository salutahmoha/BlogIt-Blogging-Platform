import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'
function hero() {
    const navigate = useNavigate()

    const handleStartWriting = ()=>{
        navigate('/RegisterUser')
    }

    const handleExploreStories = () =>{
        navigate('/RegisterUser')
    }
  return (
    <div className='hero-section'>
        <div className="hero-text">
            <h1>Share your stories With the world or explore others creativity</h1>
           <div className="call-to-action">
            <button className='btn1' onClick={handleStartWriting}>Start Writing</button>
            <button className='btn1' onClick={handleExploreStories}>Explore Stories</button>
           </div>
        </div>
    </div>
  )
}

export default hero