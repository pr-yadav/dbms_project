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
            if(userType=='0')
                history.push('/studentDashboard')
            else if(userType=='1')
                history.push('/doctorDashboard')
            else if(userType=='2')
                history.push('/staffDashboard')
            else
                history.push('/adminDashboard')
        })
    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userType)
        const token = await loginUser({
            username,
            password,
            userType
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
                <label>
                    <span>User Type</span>
                    <select onChange={e => setUserType(e.target.value)} required>
                        <option value="">Select One</option>
                        <option value="0">Student</option>
                        <option value="1">Doctor</option>
                        <option value="2">Staff</option>
                        <option value="3">Admin</option>
                    </select>
                </label>
                <div>
                  <Button className='login-btn' type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;