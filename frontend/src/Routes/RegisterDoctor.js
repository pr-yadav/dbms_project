import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'


const RegisterDoctor= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
    }

    const [doctorID, setDoctorID] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [dept, setDept] = useState();

    async function registerUser(credentials) {
        return fetch('http://localhost:12345/registerDoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]==200){
                alert("New Doctor Registered!")
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
            doctorID,
            password,
            name,
            mobile,
            dept
        });
        // setToken(token);
    }
    const logout=(e)=>{
        sessionStorage.clear()
        history.push('/login')
    }
    const back=(e)=>{
        history.push('/adminDashboard')
    }

    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
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
                <div className="register-wrapper">
                    <form className='form-container' onSubmit={handleSubmit}>
                        <label>
                            <span>DoctorID&nbsp;</span>
                            <input type="text" maxLength="20" onChange={e => setDoctorID(e.target.value)} required/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" onChange={e => setPassword(e.target.value)} required/>
                        </label>
                        <label>
                            <span>&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;</span>
                            <input type="text" maxLength="50" onChange={e => setName(e.target.value)} required/>
                        </label>
                        <label>
                            <span>&nbsp;&nbsp;Mobile&nbsp;&nbsp;</span>
                            <input type="text" maxLength="10" minLength="10" onChange={e => setMobile(e.target.value)} required/>
                        </label>
                        <label>
                            <span>&nbsp;&nbsp;&nbsp;Dept.&nbsp;&nbsp;</span>
                            <input type="text" maxLength="30" onChange={e => setDept(e.target.value)} required/>
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

export default RegisterDoctor;