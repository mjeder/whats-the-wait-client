import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../../api/auth'
import messages from '../../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.signInSuccess,
        variant: 'light'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: messages.signInFailure,
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h2 className="text-center">What&apos;s The Wait?</h2>
          <h5 className="text-center mb-5">Account Log In</h5>
          <Form onSubmit={this.onSignIn}>
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

            </Form.Row>
            <div className="text-center mt-5">
              <Button className="text-center" size="lg" variant="primary" type="submit">
              Log In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
