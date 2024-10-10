import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const admin=JSON.stringify(localStorage.getItem('admin'))
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
  <li className="nav-item">
    <Link className="nav-link" to="/employedetail">Employe Detail</Link>
  </li>
  {admin &&<li className="nav-item">
    <Link className="nav-link" to="/employedetail">{admin?.name}</Link>
  </li>}
  
  {admin && <li className="nav-item">
    <Link className="nav-link " aria-disabled="true" to='/login'>Logout</Link>
  </li>}
</ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header
