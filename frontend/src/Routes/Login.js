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
            history.push('/studentDashboard')
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
            <form onSubmit={handleSubmit} className='form-container'>
                <h3>Login</h3>
                <label>
                    <span>Username</span>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                  <Button className='login-btn' type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;