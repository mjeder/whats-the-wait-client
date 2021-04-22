import React, { Component } from 'react'
import SignUp from '../Authentication/SignUp/SignUp'
// import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

class Home extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto justify-content text-center">
          <SignUp></SignUp>
        </div>
      </div>
    )
  }
}

export default Home
