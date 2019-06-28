import React from 'react';
import './styles/home.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/login';
import Registration from './components/registration';
import StudentPortal from './components/studentportal';
import StaffPortal from './components/staffportal';

function Home() {
  return (
    <div className="Home">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Registration}></Route>
          <Route path="/studentportal" component={StudentPortal}/>
          <Route path="/staffportal" component={StaffPortal}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Home;
