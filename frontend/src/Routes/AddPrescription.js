import React, { useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/AddPrescription.css'
import image from '../assets/download.png';

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
    const [active4, setActive4] = useState(false);
    const [active5, setActive5] = useState(false);
    const [database, setDatabase] = useState([])
    const [database2, setDatabase2] = useState([])
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
        const arr = items.filter((val)=>items[index]!==val);
        setItems(prev => arr)
    }
    const deleteRowI=(val, index)=>{
        // console.log(i)
        const arr = items.filter((val)=>items[index]!==val);
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
            if(res["status"]===200){
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
      const handleShow = async () =>{
        fetch('http://localhost:12345/getPharmacy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:JSON.parse(sessionStorage.token)["token"]})
    }).then(data => {
      console.log(data.json)
        return data.json();
    }).then((res)=> {
      setDatabase(prev => res)
    })
    .catch((err)=>{
      console.log(err);
    })
    setActive4(prev => !prev);
      }
      const handleShow2 = async () =>{
        fetch('http://localhost:12345/getTest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:JSON.parse(sessionStorage.token)["token"]})
    }).then(data => {
      console.log(data.json)
        return data.json();
    }).then((res)=> {

      setDatabase2(prev => res)
    })
    .catch((err)=>{
      console.log(err);
    })
          setActive5(prev => !prev);
      }
    return(
        <>
        <div className='navbar-container'>
            <div className='navbar'>
            <img src={image} height={100} width={100} alt="" />
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
            <div className='show-btn-div'>
                <Button onClick={()=>handleShow()}>{active1?'Hide':'Show'} Medicine Table</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>handleShow2()}>{active2?'Hide':'Show'} Test Table</Button>
            </div>
            <div className='forms-container'>
            {
            active4
            ?
            <div className='form_'>
                <h3>Medicines</h3>
              <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Availability</th>
              </tr> 
            </thead>
            <tbody>
              {
                database.map((row)=>{
                  return(
                    <tr key={row['medicineID']}>
                      <td>{row['medicineID']}</td>
                      <td>{row['name']}</td>
                      <td>{row['availability']}</td>
                    </tr>)
                })
              }
            </tbody>
          </Table>
            </div>
            :
            <></>
          }
          {
            active5
            ?
            <div className='form_'>
              <h3>Tests</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Test ID</th>
                    <th>Name Name</th>
                  </tr> 
                </thead>
                <tbody>
                  {
                    database2.map((row)=>{
                      return(
                        // <tr key={row['prescriptionID']}>
                        <tr>
                          <td>{row['testID']}</td>
                          <td>{row['name']}</td>
                          {/* <td>{row['result']}</td> */}
                          {/* <td>{row['time']}</td> */}
                        </tr>)
                    })
                  }
                </tbody>
              </Table>
            </div>
            :
            <></>
          }
        </div>
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
                            <input type="text" onChange={e=>setDose(e.target.value)}/>
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
                            <span>TestID </span>
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