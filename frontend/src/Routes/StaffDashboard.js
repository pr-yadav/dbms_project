import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../assets/css/StaffDashboard.css'


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
  fetch('http://localhost:12345/getPharmacy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:JSON.parse(sessionStorage.token)["token"]})
    }).then(data => {
      console.log(data.json)
        return data.json();
    }).then((res)=> {
      setDatabase(prev => res)
    })
    .catch((err)=>{
      console.log(err);
    })
    setActive1(prev => !prev);
}
const handleShow2 = async () =>{
    history.push('/updatePharmacy')
}
const handleShow3 = async () =>{
    history.push('/updateTest')
}
  
  return(
    <>
    <div className='navbar-container'>
        <div className='navbar'>
          <div className='navbar-heading'>
            <h2>Dashboard</h2>
          </div>
          <div className='navbar-buttons'>
            <Button className='navbar-button' onClick={()=>handleShow()}>See Personal Data</Button>
            <Button className='navbar-button' onClick={()=>handleShow2()}>Reset Password</Button>
          </div>
        </div> 
      </div>
      <div className='studentDashboard-container'>
      <div className='show-btn'>
        <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Current availability of Medicines</Button>
        <Button onClick={()=>handleShow2()}>Update Pharmacy</Button>
        <Button onClick={()=>handleShow3()}>Update Test</Button>
      </div>
      
      {
        active1
        ?
        <div className='table_'>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Availability</th>
              </tr> 
            </thead>
            <tbody>
              {
                database.map((row)=>{
                  return(
                    <tr key={row['medicineID']}>
                      <td>{row['medicineID']}</td>
                      <td>{row['name']}</td>
                      <td>{row['availability']}</td>
                    </tr>)
                })
              }
            </tbody>
          </Table>
        </div>
        :
        <></>
      }
    </div>
  </>
  );
}

export default Dashboard;