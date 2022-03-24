import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'


const ResetPassword= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    async function reset(credentials) {
        return fetch('http://localhost:12345/resetPassword', {
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
                history.push('/login')
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
                password,
            });
        }
    }


    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-heading'>
                        <h2>Reset Password</h2>
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
                            <span>Password</span>
                            <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <label>
                            <span>Confirm Password</span>
                            <input type="text" onChange={e => setConfirmPassword(e.target.value)}/>
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