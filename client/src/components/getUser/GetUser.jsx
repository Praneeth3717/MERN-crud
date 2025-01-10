import  { useEffect, useState } from 'react'
import './GetUser.css' 
import axios from 'axios'
import { Link } from 'react-router-dom';

const User = () => {
  const [Data,setData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await axios.get("http://localhost:8000/route/get");
        setData(response.data)
      } catch (error) {
        console.log("Error while fetching the Data",error)
      }
    }
    fetchData();
  },[])

  const deleteUser=async(userId)=>{
    await axios.delete(`http://localhost:8000/route/delete/${userId}`)
    .then((response)=>{
        console.log(response)
      setData((prevUser)=>prevUser.filter((Data)=>Data._id!==userId))
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className='userTable'>
      <Link to="/addUser" type="button" class="btn btn-primary">Add User <i className="fa-solid fa-user-plus"></i></Link>
      {Data.length===0?<div className='abc'><h3>No Users Added</h3></div>:
      <table className='table table-bordered'>
      <thead>
      <tr>
        <th scope='col'>S.No</th>
        <th scope='col'>Name</th>
        <th scope='col'>Email</th>
        <th scope='col'>Address</th>
        <th scope='col'>Actions</th>
      </tr>
      </thead>
      <tbody>
        {Data.map((user,index)=>{
          return(
            <tr key={user._id}>
          <td>{index+1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td className='actionButton'>
            <Link to={`/update/`+user._id} type="button" class="btn btn-info">
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button onClick={()=>deleteUser(user._id)} type="button" className="btn btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>}
      
    </div>
  )
}

export default User