import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.username} DONDE VAMOS HOY??</h1>
        <button onClick={(e)=>{this.props.logout(e)}}>LOGOUT</button>
      </div>
    )
  }
}
