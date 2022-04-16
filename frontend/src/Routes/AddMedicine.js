import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'
import image from '../assets/download.png';


const AddMedicine= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
    }
    const [medicineID, setMedicineID] = useState();
    const [name, setName] = useState();
    const [manufacturer, setManufacturer] = useState();

    async function registerUser(credentials) {
        return fetch('http://localhost:12345/addMedicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]==200){
                alert("New Medicine Registered!")
            }
            else{
                alert(res["data"])
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await registerUser({
            token:JSON.parse(sessionStorage.token),
            name,
            manufacturer,
        });
        // setToken(token);
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
                        <h2>Add Medicine</h2>
                    </div>
                    <div className='navbar-buttons'>
                        <Button className='navbar-button' onClick={()=>back()}>Back to Dashboard</Button>
                        <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
                    </div>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="register-wrapper">
                    <form className='form-container' onSubmit={handleSubmit}>
                        {/* <label>
                            <span>MedicineID</span>
                            <input type="text" onChange={e => setMedicineID(e.target.value)}/>
                        </label> */}
                        <label>
                            <span>Name</span>
                            <input type="text" maxLength="50" onChange={e => setName(e.target.value)} required/>
                        </label>
                        <label>
                            <span>Manufacturer</span>
                            <input type="text" maxLength="50" onChange={e => setManufacturer(e.target.value)} required/>
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

export default AddMedicine;