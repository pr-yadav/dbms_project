import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';


const UpdatePharmacy= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [medicineID, setMedicineID] = useState();
    const [availability, setAvailability] = useState();
    const [database, setDatabase] = useState([])
    const [active1, setActive1] = useState(true);

    async function updatePharmacy(credentials) {
        return fetch('http://localhost:12345/updatePharmacy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            console.log(JSON.stringify(res))
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await updatePharmacy({
            medicineID,
            availability
        });
        // setToken(token);
    }
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
        //   setActive1(prev => !prev);
      }


    return(
      <div className="register-wrapper">
        <h1>Update Pharmacy</h1>
        <Button onClick={()=>handleShow()}>{active1?'Referesh':'Show'} Current availability of Medicines</Button>
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
        <form onSubmit={handleSubmit}>
            <label>
                <p>MedicineID</p>
                <input type="number" onChange={e => setMedicineID(e.target.value)}/>
            </label>
            <label>
                <p>Availability</p>
                <input type="number" onChange={e => setAvailability(e.target.value)}/>
            </label>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
    );
}

export default UpdatePharmacy;