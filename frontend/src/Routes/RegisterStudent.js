import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'

const RegisterStudent= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [studentID, setStudentID] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();

    async function registerUser(credentials) {
        return fetch('http://localhost:12345/registerStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]==200){
                alert("New Student Registered!")
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
            studentID,
            password,
            name,
            mobile,
            address
        });
        // setToken(token);
    }


    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-heading'>
                        <h2>Register New Students</h2>
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
                            <span>StudentID</span>
                            <input type="text" onChange={e => setStudentID(e.target.value)}/>
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
                            <span>Address</span>
                            <input type="text" onChange={e => setAddress(e.target.value)}/>
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

export default RegisterStudent;