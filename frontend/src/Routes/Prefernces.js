import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/Preferences.css'

var i=0
const DynamicTable = ({history}) =>{
    var [items,setItems]=useState([])
    var [itemsI,setItemsI]=useState([])
    var [studentID,setStudentID]=useState(0)
    var [doctorID,setDoctorID]=useState(0)
    var [medicineID,setMedicineID]=useState(0)
    var [testID,setTestID]=useState(0)
    var [dose,setDose]=useState(0)
    const addRowP=(e)=>{
        e.preventDefault();
        setItems(prev => [...prev, {medicineID, dose}])
    }
    const addRowI=(e)=>{
        e.preventDefault();
        setItemsI(prev => [...prev, {testID}])
    }
    const deleteRowP=(val, index)=>{
        // console.log(i)
        const arr = items.filter((val)=>items[index]!=val);
        setItems(prev => arr)
    }
    const addPrescription=(e)=>{
        // e.preventDefault
        return fetch('http://localhost:12345/addPrescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"doctorID":doctorID,"studentID":studentID,"prescription_desc":items,"investigation":itemsI})
        }).then(data => {
            return data.json();
        }).then((res)=>{
            console.log(JSON.stringify(res))
        })
    }
    return(
        <>
        <div className='med-test-container'>
            <div>
            <div className='form-wrapper'>
                    <form onSubmit={addRowP}>
                        <label>
                            <p>Set StudentID</p>
                            <input type="number" onChange={e=>setStudentID(e.target.value)}/>
                        </label>
                        <label>
                            <p>Set DoctorID</p>
                            <input type="number" onChange={e=>setDoctorID(e.target.value)}/>
                        </label>
                        <h2>Enter Medicines</h2>
                        <label>
                            <p>MedicineID</p>
                            <input type="text" onChange={e=>setMedicineID(e.target.value)}/>
                        </label>
                        <label>
                            <p>Dose</p>
                            <input type="number" onChange={e=>setDose(e.target.value)}/>
                        </label>
                        <div>
                            <Button type='submit'>Add Medicine to prescription</Button>
                        </div>
                    </form>
                </div>
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
                
            </div>
            <div>
                <div className='form-wrapper'>
                    <form onSubmit={addRowI}>
                        <h2>Enter Tests</h2>
                        <label>
                            <p>TestID</p>
                            <input type="text" onChange={e=>setTestID(e.target.value)}/>
                        </label>
                        <div>
                            <Button type='submit'>Enter Test ID to add</Button>
                        </div>
                    </form>
                </div>
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
                            itemsI.map((row)=>{
                                return(
                                    <tr key={i}>
                                        <td>{row['testID']}</td>
                                        {/* <td>{row['dose']}</td> */}
                                        {/* <td><Button type='submit' onClick={deleteRow(e,i)}>Delete</Button> </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
            <div className='form-wrapper' onClick={addPrescription}>
                <Button type='submit'>Add Prescription</Button>
            </div>
        </>
    )

}
export default DynamicTable