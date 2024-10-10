import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [redirect,setredirect]=useState(false)
  const [logindata,setlogindata]=useState({
    
    email:'',
    password:'',
  })
  const {email,password}=logindata
  const handelOnchange=(e)=>{
    e.preventDefault()
     const {name,value}= e.target
     setlogindata({...logindata,[name]:value})
  }



const validation=()=>{
if(email.trim===''){
return false
}
else if(password.length<8){
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
        
        const res = await axios.post('http://localhost:4000/admin/login',logindata)
        
        if(res.data.success){
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('admin',JSON.stringify(res.data.admin))
          toast.success('login succesful')
          
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
      <h1 >Login</h1>
      <form >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={email} aria-describedby="emailHelp" onChange={handelOnchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={password} onChange={handelOnchange}/>
  </div>
  <div>Not Register yet? <Link to='/register'>Register</Link></div>
  <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Login
