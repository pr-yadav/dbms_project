import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


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
    <h2>Dashboard</h2>
    <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Current availability of Medicines</Button>
    {
      active1
      ?
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
      :
      <></>
    }
    <Button onClick={()=>handleShow2()}>Update Pharmacy</Button>
    {
      <></>
    }
    <Button onClick={()=>handleShow3()}>Update Test</Button>
    {
      <></>
    }
  </>
  );
}

export default Dashboard;