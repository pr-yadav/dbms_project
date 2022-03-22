import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/StudentDashboard.css'


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
  fetch('http://localhost:12345/getData', {
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
  console.log("snkl")
  fetch('http://localhost:12345/getData2', {
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
    setActive2(prev => !prev);
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
          <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Prescription Table</Button>
          <Button onClick={()=>handleShow2()}>{active2?'Hide':'Show'} Investigation Table</Button>
        </div>
        <div className='tables-container'>
          {
            active1
            ?
            <div className='table_'>
              <h3>Prescription Table</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Prescription ID</th>
                    <th>Medicine Name</th>
                    <th>Dose</th>
                    <th>Time</th>
                  </tr> 
                </thead>
                <tbody>
                  {
                    database.map((row)=>{
                      return(
                        <tr key={row['prescriptionID']}>
                          <td>{row['prescriptionID']}</td>
                          <td>{row['name']}</td>
                          <td>{row['dose']}</td>
                          <td>{row['time']}</td>
                        </tr>)
                    })
                  }
                </tbody>
              </Table>
            </div>
            :
            <></>
          }
          {
            active2
            ?
            <div className='table_'>
              <h3>Investigation Table</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Prescription ID</th>
                    <th>Test Name</th>
                    <th>Result</th>
                    {/* <th>Time</th> */}
                  </tr> 
                </thead>
                <tbody>
                  {
                    database.map((row)=>{
                      return(
                        <tr key={row['prescriptionID']}>
                          <td>{row['prescriptionID']}</td>
                          <td>{row['name']}</td>
                          <td>{row['result']}</td>
                          {/* <td>{row['time']}</td> */}
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
    </div>
  </>
  );
}

export default Dashboard;