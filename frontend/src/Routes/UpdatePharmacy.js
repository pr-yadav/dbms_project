import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';


const UpdatePharmacy= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

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
            "medicineID":2,
            "availability":2,
        });
        // setToken(token);
    }


    return(
      <div className="register-wrapper">
        <h1>Register New Students</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
    );
}

export default UpdatePharmacy;