import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
  })

  const [err, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/auth/forgot-password", inputs) 
      navigate("/login")
    } catch(err) {
      console.log(err)
      setError(err.response.data)
    }

  }
  return (
    <div className='auth'>
      <h1>Forgot Password</h1>
      <form>
        {/* <input required type='text' placeholder='username' name='username' onChange={handleChange} /> */}
        <input required type='text' placeholder='email' name='email' onChange={handleChange}/>
        {/* <input  required type='password' placeholder='password' name='password' onChange={handleChange} /> */}
        <button onClick={handleSubmit}>Send Link</button>
        {err && <p> {err}</p>}
      </form>
      </div>
  )
}

export default ForgotPassword