import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';
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
    const [database, setDatabase] = useState([])
    const [active1, setActive1] = useState(false);


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
            console.log(JSON.stringify(res))
            history.push('/staffDashboard')
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await updateTest({
            prescriptionID,
            testID,
            result
        });
        // setToken(token);
    }


    return(
        <>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-heading'>
                        <h2>Update Test Results</h2>
                    </div>
                    <div className='navbar-buttons'>
                        {/* <Button className='navbar-button' onClick={()=>handleShow()}>See Personal Data</Button>
                        <Button className='navbar-button' onClick={()=>handleShow2()}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="login-wrapper">
                    <form className='form-container' onSubmit={handleSubmit}>
                        <label>
                            <span>PrescriptionID</span>
                            <input type="number" onChange={e => setPrescriptionID(e.target.value)}/>
                        </label>
                        <label>
                            <span>TestID</span>
                            <input type="number" onChange={e => setTestID(e.target.value)}/>
                        </label>
                        <label>
                            <span>Result</span>
                            <input type="text" onChange={e => setResult(e.target.value)}/>
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