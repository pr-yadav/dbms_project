import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../assets/css/AdminDashboard.css'

const Dashboard = ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        // console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
    const [database, setDatabase] = useState([])
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);

useEffect(()=>{
  console.log(JSON.parse(sessionStorage.token)["token"])
  // fetch Data from the server
},[])

const handleShow = async () =>{
    history.push('/registerStudent')
}
const handleShow2 = async () =>{
    history.push('/registerDoctor')
}
const handleShow3 = async () =>{
    history.push('/registerStaff')
}
const handleShow4 = async () =>{
    history.push('/resetStudent')
}
const handleShow5 = async () =>{
    history.push('/resetDoctor')
}
const handleShow6 = async () =>{
    history.push('/resetStaff')
}
  
  return(
    <>
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='navbar-heading'>
                    <h2>Dashboard</h2>
                </div>
                <div className='navbar-buttons'>
                    {/* <Button className='navbar-button' onClick={()=>handleShow()}>See Personal Data</Button>
                    <Button className='navbar-button' onClick={()=>handleShow2()}>Reset Password</Button> */}
                </div>
            </div>
        </div>
        <div className="main-wrapper">
            <div className='show-btn'>
                <Button onClick={()=>handleShow()}>Register Student</Button>
                <Button onClick={()=>handleShow2()}>Register Doctor</Button>
                <Button onClick={()=>handleShow3()}>Register HC staff</Button>
                <Button onClick={()=>handleShow4()}>Reset Password for Student</Button>
                <Button onClick={()=>handleShow5()}>Reset Password for Doctor</Button>
                <Button onClick={()=>handleShow6()}>Reset Password for HC staff</Button>
            </div>
        </div>
  </>
  );
}

export default Dashboard;