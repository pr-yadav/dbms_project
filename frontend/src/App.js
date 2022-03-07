import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Routes/Dashboard';
import Preferences from './Routes/Prefernces';
import Login from './Routes/Login';
import RegisterStudent from './Routes/RegisterStudent';
import RegisterDoctor from './Routes/RegisterDoctor';
import RegisterStaff from './Routes/RegisterStaff';


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
            <h1>Application</h1>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/registerStudent" component={RegisterStudent}/>
                    <Route path="/registerDoctor" component={RegisterDoctor}/>
                    <Route path="/registerStaff" component={RegisterStaff}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
