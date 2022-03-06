import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Routes/Dashboard';
import Preferences from './Routes/Prefernces';
import Login from './Routes/Login';
import PropTypes from 'prop-types';
function App() {
  const [token, setToken] = useState();
  if(!token){
    return <Login setToken={setToken}/>
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default App;
