import React, {useEffect} from 'react';
import { Table } from 'react-bootstrap';

const Dashboard = async ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        // console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
  


useEffect(()=>{
  // fetch Data from the server
},[])
    async function getData() {
      return fetch('http://localhost:12345/getData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:123})
      }).then(data => {
          return data.json();
      })
    }

  const database = await getData()
  // console.log(database[0])
  
  return(
    <>
    <h2>Dashboard</h2>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Prescription ID</th>
          <th>investigation</th>
          <th>medicine</th>
          <th>test</th>
        </tr>
      </thead>
      <tbody>
        {
          database.map((row)=>{
            // row=JSON.stringify(row)
            // console.log(row)
            // console.log(row['address'])
            return(
              <tr>
                <td>{row['studentID']}</td>
                <td>{row['password']}</td>
                <td>{row['name']}</td>
                <td>{row['mobile']}</td>
                <td>{row['address']}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  </>
  );
}

export default Dashboard;