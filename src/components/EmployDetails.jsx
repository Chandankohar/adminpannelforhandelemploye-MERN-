import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EmployDetails = () => {
  
  const [employes,setemployes]=useState(null)
  const [searchText, setSearchText] = useState('');
const [searchTimeout, setSearchTimeout] = useState(null);



  const getEmployees=async()=>{
    try {
          
      const {data} = await axios.get('http://localhost:4000/employe')
      if(data){
       setemployes(data)
       
        
      }
     
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

getEmployees()


},[])


const handelDelete=async(e)=>{
const id=e.target.value

try {
        
  const {data} = await axios.post(`http://localhost:4000/employe/deleteemploye/${id}`)
  if(data.success){
    getEmployees()
    toast.success(data.message)
     
  }
  
} catch (error) {
  toast.error(error.response.data.message)
}
}



const handleSearch = async (e) => {
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  if (searchText.trim() !== '') {
    
    setSearchTimeout(
      setTimeout(async () => {
        const { data } = await axios.get(
          `http://localhost:4000/employe/searchemploye/${searchText.trimStart()}`,
        );
        setemployes(data);
        
      }, 500),
    );
  }
};

if(!localStorage.getItem('admin')){
  return(<Navigate to={'/login'}/>
  )
}
  return (
    <>
    <div className='container align-items-center  mt-3'>
     <div className='d-flex justify-content-between'> 
    <h5>Total Count:{employes?.length}</h5>
    <Link to='/registeremploye'><button className="btn btn-outline-success" type="submit">Create Employee</button></Link>
    </div>
    <form className="d-flex mb-3 justify-content-center ">
        <input className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)}
        value={searchText}/>
        <button className="btn btn-outline-success" type="submit"onClick={handleSearch}>Search</button>
      </form>
      
      </div>
    <div className='container card shadow mt-5 align-items-center'>
      <h1 >Employee Details</h1>
      <table className="table table-striped table-hover">
        
  <thead>
    <tr>
      <th scope="col">Unique Id</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile No.</th>
      <th scope="col">Designation</th>
      <th scope="col">Gender</th>
      <th scope="col">Course</th>
      <th scope="col">Create Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {employes && employes.map((employe,index)=> 
    <tr key={index}>
      <th scope="row">{index}</th>

      <img src={employe.image} height={100} width={100} alt={index}/>
       <td>{employe.name}</td>
        <td>{employe.email}</td>
         <td>{employe.contact}</td>
         <td>{employe.designation}</td>
         <td>{employe.gender}</td>
         <td>{employe.course}</td>
         <td>{employe.date.slice(0,10)}</td>

      <td><Link to={`/updateemploye/${employe._id}`}><button className="btn btn-outline-success me-2" type="submit">Edit</button></Link>
      <button className="btn btn-outline-danger " value={employe._id} type="submit" onClick={handelDelete}>Delete</button></td>
    </tr>
   
  )}
  </tbody>
</table>
    </div>
    </>
  )
}

export default EmployDetails
