import React,{useEffect, useState} from 'react'
import Calendar from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestsTable from '../Request/RequestsTable';
export default function Homepage(props) {

  const [requestsList, setRequestsList] = useState([]);
  const user = props.user;


  useEffect(() => {
    const token = localStorage.getItem('token')
    let url = ''; 
    if(user && user.role === 'Employee'){
      url = 'http://localhost:3306/request/employee';
    }else if(user &&user.role === 'Manager'){
      url = 'http://localhost:3306/request'
    }
    if(url){
      axios.get(url, {headers: {Authorization: token}})
      .then(res =>{
        setRequestsList(res.data);
        console.log('res.data',res.data)
      })
    }
  },[user])

  const handleRequestClick = (id) =>{
    // e.preventDefault()
    console.log('request id', id)
    // navigate(`/food/${id}/details`);
    
  }

  return (
    <div className='page-content'>
      {user.role === 'Employee' &&
       (
         <div className='container'>
         <h1 className='u-margin-bottom-small'>Your Requests</h1>
          <div className="requests-list">
            {requestsList ? (
          <RequestsTable requests={requestsList} role={user.role}/>) : (<h2>You don't make any requests yet</h2>)}     
          </div>
        </div>)}
      
        {user.role === 'Manager' &&
        (
          <div className='container'>
            <h1 className='u-margin-bottom-small'>All Requests</h1>
            <div className="requests-list">
            {requestsList ? 
            (<RequestsTable requests={requestsList} role={user.role}/>): (<h2>You don't make any requests yet</h2>)}     
          </div>
          </div>
        )
        }
      
    </div>
  )
}