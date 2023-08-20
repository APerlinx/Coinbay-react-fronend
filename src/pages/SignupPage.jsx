import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { userService } from '../services/userService'
import { DonutLoader } from '../cmps/DonutLoader' 
import { useDispatch } from 'react-redux'

export function SignUp() {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false) 
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    userService.signup(name)
    setIsLoading(true) 

    setTimeout(() => {
      setIsLoading(false) 
      navigate('/') 
    }, 3000)
  }

  return (
    <section className="signup-container">
      <div className="signup-content">
        <h1>Jump start your crypto portfolio</h1>
        <p>
          Coinbay is the easiest place to buy and sell cryptocurrency. Sign up
          and get started today.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Get Started</button>
        </form>
        <div className='loader'>{isLoading && <DonutLoader />}</div>
      </div>
      
    </section>
  )
}
