import React, {Component} from 'react';

import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import AuthServices from './Services/Services'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null,
    }
    this.service = new AuthServices();

  }

  getTheUser = (userObj) => {
      this.setState({...this.state,
        loggedInUser: userObj,
      })
  }

  logout= (e) => {
    e.preventDefault()
    this.service.logout()
    .then(()=>{
      this.setState({
        loggedInUser: null
      })
    })
  }


  fetchUser= () => {
    this.service.loggedin()
    .then(response=>{
      this.setState({
        loggedInUser: response
      })
    })
  }



  render(){
    
    if(this.state.loggedInUser){
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/login' render={()=>{return <Redirect to="/profile" />}}/>
            <Route exact path='/profile' render={()=><Profile {...this.state.loggedInUser} logout={this.logout}/>}/>
          </Switch>
        </React.Fragment>
      );
    }else{
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/login' render={()=><Login {...this.state.loggedInUser} getUser={this.getTheUser}/>}/>
            <Route exact path='/signup' render={()=><Signup {...this.state.loggedInUser}/>}/>
            <Route render={()=>{return <Redirect to="/login" />}}/>
           </Switch>
        </React.Fragment>
      )
    }
      
  }

}

export default App;
