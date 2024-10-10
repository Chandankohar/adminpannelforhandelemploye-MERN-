import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'

const RegisterEmployForm = () => {
  const {id} =useParams()
  const [redirect,setredirect]=useState(false)
  const [photos, setPhotos] = useState(null);
  const checkboxes = ['MCA', 'BCA', 'BSC'];
  const [checkbox,setcheckbox]=useState('MCA')
  
  const [employeData,setemployeData]=useState({
    username:'',
    email:'',
    contact:'',
    designation:'',
    gender:'',
    image:'',
    course:'',
  })
  const {username,email,contact,designation,gender,image,course}=employeData

  const handleImageChange = async(e) => {
    e.preventDefault()
    try{
    const file=e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post('http://localhost:4000/employe/upload-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log(data)
  setPhotos(data)
  console.log(photos)
}
  catch (err) {
    toast.error(err.response.data.message)
  }

  };

  const handelOnchangecheckbox=async(e)=> {
       
      let value=e.target.value
      setcheckbox(value)    
      
}

  const handelOnchange=(e)=>{
    
 const{name,value}=e.target
   setemployeData({...employeData,[name]:value})
   
  }

  const validation=()=>{
    if(username.trim() === ''){
    toast.error('username cant be null')
    return false
    }
    else if(email.trim()===''){
      toast.error('email cant be null')
    return false
    }
    else if(contact.trim()===''){
      toast.error('contact cant empty')
    return false
    }
    else if(designation.trim() ===''){
      toast.error('designation cant empty')
    return false
    }
    else if(course.trim() ===''){
      toast.error('course cant empty')
    return false
    }
    else if(gender.trim() ===''){
      toast.error('gender cant empty')
    return false
    }
    else if(image?.trim()===''){
      toast.error('image cant empty')
    return false
    }
    else{
      return true
    }
      }
    
      useEffect(() => {
        if (!id) {
          return;
        }
        
        axios.get(`http://localhost:4000/employe/singleemploye/${id}`).then((response) => {
          const { employe } = response.data;
          // update the state of formData
          setemployeData({...employeData,username:employe.name})
          for (let key in employeData) {
            if (employe.hasOwnProperty(key)) {
              
              setemployeData((prev) => ({
                ...prev,
                [key]: employe[key],
              }));
            }
          }
    
          // update photos state separately
          
    
        });
      }, [id]);

  const handelSubmit=async(e)=>{
    e.preventDefault()

    setemployeData({...employeData,course:checkbox,image:photos})
    console.log('emp',employeData.image)
    console.log(employeData)
    if(validation()){
    
    try {
      if (id) {
        // update existing place
        const { data } = await axios.put(`http://localhost:4000/employe/updateemploye/${id}`, {
          
          ...employeData,
        });
        if(data.success){
          toast.success(data.message)
          setredirect(true)
          
        }
      } else {

      const {data} = await axios.post('http://localhost:4000/employe/addemploye', employeData);
      if(data.success){
        toast.success(data.message)
        setredirect(true)
        
      }}
      
    } catch (err) {
      toast.error(err.response.data.message)
    }} 
  }
  if(redirect){
    return(<Navigate to={'/employedetail'}/>)
  }
  return (
    <div className='container-sm mt-5 w-25  card shadow  p-3 align-items-center' >
      
            <h2>Create Employee</h2>
      <form>
      <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="text" className="form-control" name='username' value={username} id="exampleInputname" onChange={handelOnchange}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={email} id="exampleInputEmail1" onChange={handelOnchange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputcontact" className="form-label">Mobile No.</label>
    <input type="text" className="form-control" name='contact' value={contact} id="exampleInputcontact" onChange={handelOnchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputdesignation" className="form-label">Designation</label>
    <select name="designation" onChange={handelOnchange} value={designation} id='exampleInputdesignation'>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="sales">sales</option>
          
        </select>
  </div>
  <div className="mb-3">
  <label htmlFor="male">
         Male
          <input
          id='male'
            type="radio"
            name="gender"
            value="male"
            
            onChange={handelOnchange}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
          id='female'
            type="radio"
            name="gender"
            value="female"
            
            onChange={handelOnchange}
          />
        </label>
  </div>

  <div className="mb-3">
   Course <br/>
  
         
          {checkboxes.map((option, index) => (
        <label htmlFor={option} key={index}>
          <input
          id={option}
            type="checkbox"
            name='checkbox'
            value={option}
            checked={checkbox === option}
            onClick={handelOnchangecheckbox}
          />
          {option}
        </label>
      ))}
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Upload Photo</label>
    <input type="file"  onChange={handleImageChange} />
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
    </div>
  )
}

export default RegisterEmployForm
