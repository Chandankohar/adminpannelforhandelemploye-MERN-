import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const [redirect,setredirect]=useState(false)
  const [registerdata,setregisterdata]=useState({
    username:'',
    email:'',
    password:'',
  })
  const {username,email,password}=registerdata
  const handelOnchange=(e)=>{
    e.preventDefault()
     const {name,value}= e.target
     setregisterdata({...registerdata,[name]:value})
  }



const validation=()=>{
if(username.trim===''){
toast.error('username cant be null')
return false
}
else if(email.trim===''){
  toast.error('email cant be null')
return false
}
else if(password.length<8){
  toast.error('password cant be less than 8')
return false
}
else{
  return true
}
  }

  

  const handelSubmit=async(e)=>{
    e.preventDefault()
    if(validation()){
      try {
        
        const {data} = await axios.post('http://localhost:4000/admin/register',registerdata)
        if(data.success){
          toast.success('Register succesful')
          localStorage.setItem('token',data.token)
          localStorage.setItem('admin',data.admin)
          setredirect(true)
          
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  if(redirect){
    return(<Navigate to={'/'}/>)
  }
  return (
    <div className='container-sm mt-5 w-25  card shadow  p-3 align-items-center'>
      <h1>Register</h1>
      <form >
      <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="text" className="form-control" name='username' value={username} id="exampleInputname" onChange={handelOnchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handelOnchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={password} id="exampleInputPassword1" onChange={handelOnchange}/>
  </div>
  <div>Already Registered? <Link to='/login'>Login</Link></div>
  
  <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Register
