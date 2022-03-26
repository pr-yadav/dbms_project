import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/AddPrescription.css'

var i=0
const DynamicTable = ({history}) =>{
    if(sessionStorage.length===0)
        history.push('/login')
    var [items,setItems]=useState([])
    var [itemsI,setItemsI]=useState([])
    var [studentID,setStudentID]=useState(0)
    var [doctorID,setDoctorID]=useState(0)
    var [medicineID,setMedicineID]=useState(0)
    var [testID,setTestID]=useState(0)
    var [dose,setDose]=useState(0)
    const [active3, setActive3] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active1, setActive1] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setActive3(prev => !prev);
        // setToken(token);
    }
    const addRowP=(e)=>{
        setActive1(true)
        e.preventDefault();
        setItems(prev => [...prev, {medicineID, dose}])
    }
    const addRowI=(e)=>{
        setActive2(true)
        e.preventDefault();
        setItemsI(prev => [...prev, {testID}])
    }
    const deleteRowP=(val, index)=>{
        // console.log(i)
        const arr = items.filter((val)=>items[index]!=val);
        setItems(prev => arr)
    }
    const deleteRowI=(val, index)=>{
        // console.log(i)
        const arr = items.filter((val)=>items[index]!=val);
        setItemsI(prev => arr)
    }
    const addPrescription=(e)=>{
        // e.preventDefault
        return fetch('http://localhost:12345/addPrescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"doctorID":doctorID,"studentID":studentID,"prescription_desc":items,"investigation":itemsI,token:JSON.parse(sessionStorage.token)})
        }).then(data => {
            return data.json();
        }).then((res)=>{
            console.log(res)
            if(res["status"]==200){
                alert("Prescription added!")
                history.push('/doctorDashboard')
            }
            else{
                sessionStorage.clear()
                alert(res["data"])
            }
        })
    }
    const logout=(e)=>{
        sessionStorage.clear()
        history.push('/login')
      }
      const back=(e)=>{
          history.push('/doctorDashboard')
      }
    return(
        <>
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='navbar-heading'>
                    <h2>Dashboard</h2>
                </div>
                <div className='navbar-buttons'>
                    <Button className='navbar-button' onClick={()=>back()}>Back</Button>
                    <Button className='navbar-button-logout' onClick={()=>logout()}>Logout</Button>
                </div>
            </div> 
        </div>
        <div className='main-wrapper'>
            <form className='form-container' onSubmit={handleSubmit}>
                {active3
                ?
                <>
                <label>
                    <span>StudentID</span>
                    <input type="text" onChange={e=>setStudentID(e.target.value)}/>
                </label>
                <label>
                    <span>DoctorID</span>
                    <input type="text" onChange={e=>setDoctorID(e.target.value)}/>
                </label>
                </>
                :
                <>
                <h3>StudentID:{studentID}</h3>
                <h3>DoctorID:{doctorID}</h3>
                </>
                }
                <div>
                    <Button className='set-btn' type="submit">{active3?'Set':'Reset'}</Button>
                </div>
            </form>
            <div className='forms-container'>
                <div className='form_'>
                    <form onSubmit={addRowP} className='form-container'>
                        <h2>Enter Medicines</h2>
                        <label>
                            <span>MedicineID</span>
                            <input type="text" onChange={e=>setMedicineID(e.target.value)}/>
                        </label>
                        <label>
                            <span>Dose</span>
                            <input type="number" onChange={e=>setDose(e.target.value)}/>
                        </label>
                        <div>
                            <Button type='submit'>Add Medicine to prescription</Button>
                        </div>
                    </form>
                    {active1?
                    <Table striped border hover responsive>
                        <thead>
                            <tr>
                                <th>MedicineID</th>
                                <th>Dose</th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((row, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{row['medicineID']}</td>
                                            <td>{row['dose']}</td>
                                            <td><Button onClick={() => deleteRowP(i, index)}>Delete</Button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    :
                    <></>}
                </div>     
                <div className='form_'>
                    <form onSubmit={addRowI} className='form-container'>
                        <h2>Enter Tests</h2>
                        <label>
                            <p>TestID</p>
                            <input type="text" onChange={e=>setTestID(e.target.value)}/>
                        </label>
                        <div>
                            <Button type='submit'>Enter Test ID to add</Button>
                        </div>
                    </form>
                    {active2?
                    <Table striped border hover responsive>
                        <thead>
                            <tr>
                                <th>testID</th>
                                {/* <th>Dose</th> */}
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemsI.map((row,index)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{row['testID']}</td>
                                            <td><Button onClick={() => deleteRowI(i, index)}>Delete</Button> </td>
                                            {/* <td>{row['dose']}</td> */}
                                            {/* <td><Button type='submit' onClick={deleteRow(e,i)}>Delete</Button> </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    :
                    <></>
                    }
                </div>
            </div>
        </div>
            <div className='form-wrapper' onClick={addPrescription}>
                <center>
                    <Button type='submit'>Add Prescription</Button>
                </center>
            </div>
        </>
    )

}
export default DynamicTable