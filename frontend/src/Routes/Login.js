import React, {useState} from 'react';
import '../assets/css/Login.css';
import { Button } from 'react-bootstrap';
import image from '../assets/image.png';

const Login = ({history}) => {
    sessionStorage.clear()
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
            if(res["status"]===200){
                sessionStorage.setItem('token', JSON.stringify(res["token"]))
                if(userType==='0')
                    history.push('/studentDashboard')
                else if(userType==='1')
                    history.push('/doctorDashboard')
                else if(userType==='2')
                    history.push('/staffDashboard')
                else
                    history.push('/adminDashboard')
            }
            else{
                alert(res["status"] + " : " + res["token"])
            }
        })
    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser({
            username,
            password,
            userType
        });
        // setToken(token);
    }
    return(
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className='form-container'>
            <img src={image} height={100} width={100} alt=""/>
                <h2>Login</h2>
                <label>
                    <span>Username</span>
                    <input maxLength="20" size="20" type="text" onChange={e => setUserName(e.target.value)} required/>
                </label>
                <label>
                    <span>Password</span>
                    <input size="20" type="password" onChange={e => setPassword(e.target.value)} required/>
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