import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'


const ResetPassword= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
    const [userID, setUserID] = useState();
    const [userType, setUserType] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    async function reset(credentials) {
        return fetch('http://localhost:12345/resetPasswordAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]==200){
                alert("Password Reset!")
            }
            else{
                alert(res["token"])
                history.push('/login')
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!=confirmPassword){
            alert("Passwords don't match")
        }
        else{
            const token = await reset({
                token:JSON.parse(sessionStorage.token),
                userType,
                userID,
                password
            });
        }
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
                        <h2>Reset Password</h2>
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
                            <span>Username</span>
                            <input type="text" onChange={e => setUserID(e.target.value)}/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <label>
                            <span>Confirm Password</span>
                            <input type="text" onChange={e => setConfirmPassword(e.target.value)}/>
                        </label>
                        <label>
                            <span>User Type</span>
                            <select onChange={e => setUserType(e.target.value)} required>
                                <option value="">Select One</option>
                                <option value="0">Student</option>
                                <option value="1">Doctor</option>
                                <option value="2">Staff</option>
                            </select>
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

export default ResetPassword;