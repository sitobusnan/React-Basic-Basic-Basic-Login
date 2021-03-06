import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthServices from '../Services/Services'

export default class Signup extends Component {

  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthServices();
  }


  handleFormSubmit = (event) => {
  event.preventDefault();
  const username = this.state.username;
  const password = this.state.password;

  this.service.signup(username, password)
  .then( response => {
      this.setState({
          username: "", 
          password: "",
      });
      // this.props.getUser(response)
  })
  .catch( error => console.log(error) )
}

handleChange = (event) => {  
  const {name, value} = event.target;
  this.setState({[name]: value});
}
    

render(){
  return(
    <div>
      <form onSubmit={this.handleFormSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        
        <label>Password:</label>
        <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
        
        <input type="submit" value="Signup" />
      </form>

      <p>Already have account? 
          <Link to={"/login"}> Login</Link>
      </p>

    </div>
  )
}
}
