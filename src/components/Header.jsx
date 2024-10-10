import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  
  const [admin,setadmin]=useState(null)
  

  useEffect(()=>setadmin(JSON.parse(localStorage.getItem('admin'))),[admin?._id])
  
  console.log(admin)
  const handellogout=()=>{
   
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    setadmin(null)
    window.location.reload()
    
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
  <div className="container-fluid">
  <Link className="navbar-brand" to="/">
      <img src="https://toppng.com/uploads/preview/new-employee-icon-people-transparent-background-employee-icon-11553428881fb5mqdvota.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
     
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="nav nav-tabs">
  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
  </li>
  {admin && <><li className="nav-item">
    <Link className="nav-link" to="/employedetail">Employe Detail</Link>
  </li>
  
  
  <li className="nav-item">
    <button className="nav-link " aria-disabled="true" onClick={handellogout}>Logout</button>
  </li>
  
  </>}
  {!admin && <li className="nav-item">
    <Link className="nav-link " aria-disabled="true" to='/login'>Login</Link>
  </li>}
  
</ul>

    </div>
    {admin && <div className=" mt-2 me-5">
    <p className="nav-link text-danger" >-{admin?.name}</p>
  </div>}
  </div>
  
</nav>
    </>
  )
}

export default Header
