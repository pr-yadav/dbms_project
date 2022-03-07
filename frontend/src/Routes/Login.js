import React, {useState} from 'react';
import '../assets/css/Login.css';

import { Button } from 'react-bootstrap';

const Login = ({history}) => {

    async function loginUser(credentials) {
        return fetch('http://localhost:12345/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            console.log(JSON.stringify(res))
            sessionStorage.setItem('token', JSON.stringify(res))
            history.push('/dashboard')
        })
    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        // setToken(token);
    }
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
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
    )
}

export default Login;