import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';


const RegisterStaff= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [staffID, setStaffID] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();

    async function registerUser(credentials) {
        return fetch('http://localhost:12345/registerStaff', {
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
            staffID,
            password,
            name,
            mobile,
            address
        });
        // setToken(token);
    }


    return(
      <div className="register-wrapper">
        <h1>Register New Staff</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>StaffID</p>
                <input type="text" onChange={e => setStaffID(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="text" onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p>Name</p>
                <input type="text" onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <p>Mobile</p>
                <input type="text" onChange={e => setMobile(e.target.value)}/>
            </label>
            <label>
                <p>Address</p>
                <input type="text" onChange={e => setAddress(e.target.value)}/>
            </label>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
    );
}

export default RegisterStaff;