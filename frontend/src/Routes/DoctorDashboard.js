import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/DoctorDashboard.css'

const Dashboard = ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        // console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
    const [database, setDatabase] = useState([])
    const [database2, setDatabase2] = useState([])
    const [userName, setUserName] = useState([])
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(true);

useEffect(()=>{
  // console.log(JSON.parse(sessionStorage.token)["token"])
  // fetch Data from the server
},[])
const handleSubmit = async (e) => {
    e.preventDefault();
    setActive3(prev => !prev);
    // setToken(token);
}
const handleShow = async () =>{
  if(userName==""){
    alert("Please select a student ID")
  }
  else{
    fetch('http://localhost:12345/getData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({token:JSON.parse(sessionStorage.token),studentID:JSON.parse(userName)})
      }).then(data => {
          return data.json();
      }).then((res)=> {
        console.log(res)
        if(res["status"]==200){
          setDatabase(prev => res["data"])
        }
        else{
          alert(res["data"])
          history.push('/login')
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      setActive1(prev => !prev);
  }
}
const handleShow2 = async () =>{
    console.log(userName)
    fetch('http://localhost:12345/getData2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({token:JSON.parse(sessionStorage.token),studentID:JSON.parse(userName)})
    }).then(data => {
        return data.json();
    }).then((res)=> {
      if(res["status"]==200){
        setDatabase2(prev => res["data"])
      }
      else{
        sessionStorage.clear()
        alert(res["data"])
        history.push('/login')
      }
    })
    .catch((err)=>{
      console.log(err);
    })
    setActive2(prev => !prev);
}
const handleShow3=()=>{
  history.push('/addPrescription')
}
const personalData = async () =>{
  fetch('http://localhost:12345/getData3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:JSON.parse(sessionStorage.token)})
    }).then(data => {
        return data.json();
    }).then((res)=> {
      if(res["status"]==200){
        alert("DoctorID : "+res["data"][0]["doctorID"]+
              "\nName : "+res["data"][0]["name"]+
              "\nMobile : "+res["data"][0]["mobile"]+
              "\nDepartment : "+res["data"][0]["department"])
      }
      else{
        sessionStorage.clear()
        alert(res["data"])
        history.push('/login')
      }
    })
    .catch((err)=>{
      console.log(err);
    })
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
            <Button className='navbar-button' onClick={()=>personalData()}>See Personal Data</Button>
            <Button className='navbar-button' onClick={()=>resetPassword()}>Reset Password</Button>
            <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
          </div>
        </div> 
      </div>
      <div className="login-wrapper">
        <form className='form-container' onSubmit={handleSubmit}>
              {
              active3
              ?
              <label>
                  <span>StudentID</span>
                  <input type="text" onChange={e => setUserName(e.target.value)}/>
              </label>
              :
              <h3>StudentID:{userName}</h3>
              }
              <div>
                  <Button className='set-btn' type="submit">{active3?'Set':'Reset'}</Button>
              </div>
    
          </form>
        </div>
        <div className='studentDashboard-container'>
        <div className='show-btn'>
        <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Prescription Table</Button>
          <Button onClick={()=>handleShow2()}>{active2?'Hide':'Show'} Investigation Table</Button>
          <Button onClick={()=>handleShow3()}>Add Prescription</Button>
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
                    database2.map((row)=>{
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