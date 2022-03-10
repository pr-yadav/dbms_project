import React, {useEffect, useState} from 'react';
import { Table,Button } from 'react-bootstrap';


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
      <div className="register-wrapper">
        <h1>Update Test Results</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>PrescriptionID</p>
                <input type="number" onChange={e => setPrescriptionID(e.target.value)}/>
            </label>
            <label>
                <p>TestID</p>
                <input type="number" onChange={e => setTestID(e.target.value)}/>
            </label>
            <label>
                <p>Result</p>
                <input type="text" onChange={e => setResult(e.target.value)}/>
            </label>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
    );
}

export default UpdateTest;