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
        history.push('/resetPasswordAdmin')
    }
    const handleShow6 = async () =>{
        history.push('/resetPersonalDetailsDoctor')
    }
    const handleShow7 = async () =>{
        history.push('/resetPersonalDetailsStaff')
    }
    const handleShow5 = async () =>{
        history.push('/resetPersonalDetailsStudent')
    }
    const logout=(e)=>{
        sessionStorage.clear()
        history.push('/login')
    }
    const resetPassword=(e)=>{
        history.push('/resetPassword')
    }
  
  return(
    <>
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='navbar-heading'>
                    <h2>Dashboard</h2>
                </div>
                <div className='navbar-buttons'>
                    <Button className='navbar-button' onClick={()=>resetPassword()}>Reset Password</Button>
                    <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
                </div>
            </div>
        </div>
        <div className="main-wrapper">
            <div className='show-btn'>
                <Button onClick={()=>handleShow()}>Register Student</Button>
                <Button onClick={()=>handleShow2()}>Register Doctor</Button>
                <Button onClick={()=>handleShow3()}>Register HC staff</Button>
                <Button onClick={()=>handleShow4()}>Reset Password for other users</Button>
                <Button onClick={()=>handleShow5()}>Update Personal Details for student</Button>
                <Button onClick={()=>handleShow6()}>Update Personal Details for doctor</Button>
                <Button onClick={()=>handleShow7()}>Update Personal Details for staff</Button>
            </div>
        </div>
  </>
  );
}

export default Dashboard;