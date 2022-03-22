import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'


const RegisterDoctor= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
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
            console.log(JSON.stringify(res))
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await registerUser({
            doctorID,
            password,
            name,
            mobile,
            dept
        });
        // setToken(token);
    }


    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-heading'>
                        <h2>Register New Doctor</h2>
                    </div>
                    <div className='navbar-buttons'>
                        {/* <Button className='navbar-button' onClick={()=>handleShow()}>See Personal Data</Button>
                        <Button className='navbar-button' onClick={()=>handleShow2()}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="register-wrapper">
                    <form className='form-container' onSubmit={handleSubmit}>
                        <label>
                            <span>DoctorID</span>
                            <input type="text" onChange={e => setDoctorID(e.target.value)}/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <label>
                            <span>Name</span>
                            <input type="text" onChange={e => setName(e.target.value)}/>
                        </label>
                        <label>
                            <span>Mobile</span>
                            <input type="text" onChange={e => setMobile(e.target.value)}/>
                        </label>
                        <label>
                            <span>Department</span>
                            <input type="text" onChange={e => setDept(e.target.value)}/>
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