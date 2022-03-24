import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Routes/Login';
import RegisterStudent from './Routes/RegisterStudent';
import RegisterDoctor from './Routes/RegisterDoctor';
import RegisterStaff from './Routes/RegisterStaff';
import AddPrescription from './Routes/AddPrescription';
import UpdateTest from './Routes/UpdateTest';
import UpdatePharmacy from './Routes/UpdatePharmacy';
import StudentDashboard from './Routes/StudentDashboard'
import StaffDashboard from './Routes/StaffDashboard'
import DoctorDashboard from './Routes/DoctorDashboard'
import AdminDashboard from './Routes/AdminDashboard'
import ResetPassword from './Routes/ResetPassword'
import AddMedicine from './Routes/AddMedicine'
import ResetPasswordAdmin from './Routes/ResetPasswordAdmin'
import ResetPersonalDetailsDoctor from './Routes/ResetPersonalDetailsDoctor'
import ResetPersonalDetailsStudent from './Routes/ResetPersonalDetailsStudent'
import ResetPersonalDetailsStaff from './Routes/ResetPersonalDetailsStaff'


// export function setToken(userToken){
//     sessionStorage.setItem('token', JSON.stringify(userToken));
// }
// const getToken=()=>{
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// }
function App() {
    // const { token, setToken } = useToken();
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path="/studentDashboard" component={StudentDashboard}/>
                    <Route path="/registerStudent" component={RegisterStudent}/>
                    <Route path="/registerDoctor" component={RegisterDoctor}/>
                    <Route path="/registerStaff" component={RegisterStaff}/>
                    <Route path="/addPrescription" component={AddPrescription}/>
                    <Route path="/updateTest" component={UpdateTest}/>
                    <Route path="/updatePharmacy" component={UpdatePharmacy}/>
                    <Route path="/staffDashboard" component={StaffDashboard}/>
                    <Route path="/doctorDashboard" component={DoctorDashboard}/>
                    <Route path="/adminDashboard" component={AdminDashboard}/>
                    <Route path="/resetPassword" component={ResetPassword}/>
                    <Route path="/addMedicine" component={AddMedicine}/>
                    <Route path="/resetPasswordAdmin" component={ResetPasswordAdmin}/>
                    <Route path="/resetPersonalDetailsDoctor" component={ResetPersonalDetailsDoctor}/>
                    <Route path="/resetPersonalDetailsStudent" component={ResetPersonalDetailsStudent}/>
                    <Route path="/resetPersonalDetailsStaff" component={ResetPersonalDetailsStaff}/>
                    <Route path='*' component={Login}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
