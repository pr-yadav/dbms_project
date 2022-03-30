import React, {useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/UpdatePharmacy.css'
import image from '../assets/download.png';

const UpdatePharmacy= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [medicineID, setMedicineID] = useState();
    const [availability, setAvailability] = useState();
    const [database, setDatabase] = useState([])
    const [active1, setActive1] = useState(false);

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
            if(res["status"]===200){
                alert("Medicne Availability updated!")
            }
            else{
                alert(res["data"])
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePharmacy({
            token:JSON.parse(sessionStorage.token),
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
              body: JSON.stringify({id:JSON.parse(sessionStorage.token)})
          }).then(data => {
            console.log(data.json)
              return data.json();
          }).then((res)=> {
            setDatabase(prev => res)
          })
          .catch((err)=>{
            console.log(err);
          })
          setActive1(true);
      }
      const logout=(e)=>{
        sessionStorage.clear()
        history.push('/login')
      }
      const back=(e)=>{
          history.push('/staffDashboard')
      }

    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                <img src={image} height={100} width={100} />
                    <div className='navbar-heading'>
                        <h2>Update Pharmacy</h2>
                    </div>
                    <div className='navbar-buttons'>
                        <Button className='navbar-button' onClick={()=>back()}>Back to Dashboard</Button>
                        <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
                    </div>
                </div>
            </div>
        <div className="main-wrapper">
            <div className='show-btn'>
                <Button onClick={()=>handleShow()}>{active1?'Referesh':'Show'} Current availability of Medicines</Button>
            </div>
            <div className='tables-container'>
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
            <div className="login-wrapper">
                <form className='form-container' onSubmit={handleSubmit}>
                    <label>
                        <span>MedicineID</span>
                        <input type="text" maxLength="8" onChange={e => setMedicineID(e.target.value)} required/>
                    </label>
                    <label>
                        <span>Availability</span>
                        <input type="text" maxLength="8" onChange={e => setAvailability(e.target.value)} required/>
                    </label>
                    <div>
                        <Button className='set-btn' type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default UpdatePharmacy;