import logo from './logo.svg';
import './App.css';
import React, { useContext, createContext, useState } from "react";
import routerCofig from './routerconfig.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import {connect} from 'react-redux'

class App extends React.Component{
  constructor(props){
    super(props)
    console.log(props);
  }
  render(){
    const token = this.props.token;
    return (
      <Router>
        <Switch>
          {routerCofig.map((item,index)=>{
            return (
              <Route key={index} path={item.path} render={(props)=>(
                !item.auth?<item.component {...props}></item.component>:
                (token?<item.component {...props}></item.component>:<Redirect to={{
                  pathname:'/login',
                  state: { from: props.location }
                }}></Redirect>)
  
              )}></Route>
            )
          })}
        </Switch>
      </Router>
    );
  }
}
function mapStateToProps(state){
  return {
    token:state.login.token
  }
}
const ConnectApp = connect(mapStateToProps)(App)
function Apps(props) {
  // let productList =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  // let rootSize = 140;
  const token = true;
  return (
    <Router>
      <Switch>
        {routerCofig.map((item,index)=>{
          return (
            <Route key={index} path={item.path} render={(props)=>(
              !item.auth?<item.component {...props}></item.component>:
              (token?<item.component {...props}></item.component>:<Redirect to={{
                pathname:'/login',
                state: { from: props.location }
              }}></Redirect>)

            )}></Route>
          )
        })}
      </Switch>
    </Router>
  );
}

export default ConnectApp;
