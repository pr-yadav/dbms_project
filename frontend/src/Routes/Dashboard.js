import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';

const Dashboard = ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        // console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
    const [database, setDatabase] = useState([])

useEffect(()=>{
  console.log("lol")
  // fetch Data from the server
  fetch('http://localhost:12345/getData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:1239})
    }).then(data => {
      console.log(data.json)
        return data.json();
    }).then((res)=> setDatabase(prev => res))
    .catch((err)=>{
      console.log(err);
    })
},[])

  console.log(database)
  
  return(
    <>
    <h2>Dashboard</h2>
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
  </>
  );
}

export default Dashboard;