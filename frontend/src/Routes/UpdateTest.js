import React, {useState} from 'react';
import {Button } from 'react-bootstrap';
import '../assets/css/UpdateTest.css'

const UpdateTest= ({history}) => {
    if(sessionStorage.length===0)
        history.push('/login')
    else{
        console.log(JSON.parse(sessionStorage.getItem('token'))['token'])
    }
    const [prescriptionID, setPrescriptionID] = useState();

    const [testID, setTestID] = useState();
    const [result, setResult] = useState();


    async function updateTest(credentials) {
        return fetch('http://localhost:12345/updateTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(data => {
            return data.json();
        }).then((res)=>{
            if(res["status"]===200){
                alert("Test Result Updated!")
            }
            else{
                alert(res["data"])
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTest({
            token:JSON.parse(sessionStorage.token),
            prescriptionID,
            testID,
            result
        });
        // setToken(token);
    }
    const logout=(e)=>{
        sessionStorage.clear()
        history.push('/login')
      }
      const back=(e)=>{
          history.push('/staffDashboard')
      }

    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-heading'>
                        <h2>Update Test Results</h2>
                    </div>
                    <div className='navbar-buttons'>
                        <Button className='navbar-button' onClick={()=>back()}>Back to Dashboard</Button>
                        <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
                    </div>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="login-wrapper">
                    <form className='form-container' onSubmit={handleSubmit}>
                        <label>
                            <span>PrescriptionID</span>
                            <input type="text" onChange={e => setPrescriptionID(e.target.value)} required/>
                        </label>
                        <label>
                            <span>TestID</span>
                            <input type="text" onChange={e => setTestID(e.target.value)} required/>
                        </label>
                        <label>
                            <span>Result</span>
                            <input maxLength="100" type="text" onChange={e => setResult(e.target.value)} required/>
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

export default UpdateTest;