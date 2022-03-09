import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';

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
    <h2>Dashboard</h2>
    <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Prescription Table</Button>
    {
      active1
      ?
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
      :
      <></>
    }
    <Button onClick={()=>handleShow2()}>{active2?'Hide':'Show'} Investigation Table</Button>
    {
      active2
      ?
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
      :
      <></>
    }
  </>
  );
}

export default Dashboard;