import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
import '../assets/css/Register.css'

const ResetPersonalDetailsStaff= ({history}) => {
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
    const [dept, setDept] = useState();

    async function registerUser(credentials) {
        return fetch('http://localhost:12345/resetPersonalDetailsStaff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]==200){
                alert("Updated!")
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
            staffID,
            name,
            mobile,
            address,
            dept
        });
        // setToken(token);
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
                        <h2>Update Personal Details</h2>
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
                            <span>&nbsp;&nbsp;StaffID&nbsp;&nbsp;</span>
                            <input type="text" onChange={e => setStaffID(e.target.value)}/>
                        </label>
                        {/* <label>
                            <span>Password</span>
                            <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </label> */}
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
                        <label>
                            <span>Dept</span>
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

export default ResetPersonalDetailsStaff;