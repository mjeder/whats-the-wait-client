import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn } from '../../../api/auth'
import messages from '../../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      restaurant: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.signUpSuccess,
        variant: 'light'
      }))
      .then(() => history.push('/waitlists'))
      .catch(error => {
        this.setState({ email: '', restaurant: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: messages.signUpFailure,
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, restaurant, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 justify-content">
          <div>
            <img src="logo3.png" className="mx-auto d-block mt-4 mb-5"/>
          </div>
          <h4 className="text-center mt-3 mb-4">Create An Account</h4>
          <Form onSubmit={this.onSignUp}>
            <Form.Row className="mb-3">
              <Form.Group as={Col} controlId="email" className="mr-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="example@example.com"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="restaurant">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="restaurant"
                  value={restaurant}
                  placeholder="Example Bar & Grill"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="password" className="mr-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="••••••••"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  placeholder="••••••••"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <div className="text-center mt-3">
              <Button className="text-center" variant="flat" size="lg" type="submit">Create Account</Button>
              <h4 className="text-center mt-4 mb-4">- Or -</h4>
              <Link to={'/sign-in'}>
                <Button className="text-center" variant="flat" size="lg">Log In</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
