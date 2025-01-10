import { useEffect, useState }  from 'react'
import './UpdateUser.css'
import {Link,useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';

const UpdateUser = () => {
  const inputuser={
    name: "",
    email: "",
    address: "",
  };
  const [user,setuser]=useState(inputuser)
  const navigate=useNavigate();
  const {id}=useParams();

  const inputHandler=(e)=>{
    const {name,value}=e.target;
    setuser({...user,[name]:value})
  }
  
  useEffect(()=>{
    axios.get(`https://mernstack-crud-backend.onrender.com/route/getDataById/${id}`)
    .then((response)=>{
      setuser(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[id])

  const userSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.put(`https://mernstack-crud-backend.onrender.com/route/update/${id}`,user)
      console.log(response.data);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='newUser'>
      <div className='backtodata'>
              <Link to='/' type="button" class="btn btn-secondary">
              <i className="fa-solid fa-backward"></i> Back
              </Link>
            </div>
            <h3>Update User</h3>
            <form className='userForm' onSubmit={userSubmit}>
              <div className='inputForm'>
                <label htmlFor='name'>Name:</label>
                <input type="text" onChange={inputHandler} value={user.name} placeholder='Please enter your name' id='name' autoComplete='off' name='name'/>
              </div>
              <div className='inputForm'>
                <label htmlFor='email'>Email:</label>
                <input type='email' onChange={inputHandler} value={user.email} placeholder='Please enter your mail' id='email' autoComplete='off' name='email'></input>
              </div>
              <div className='inputForm'>
                <label htmlFor='address'>Address:</label>
                <input type='text' onChange={inputHandler} value={user.address} placeholder='Please enter your mail' id='address' autoComplete='off' name='address'></input>
              </div>
              <div className='inputForm'>
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
    </div>
  )
}

export default UpdateUser
