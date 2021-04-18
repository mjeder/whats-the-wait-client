import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'
import { waitlistShow, waitlistUpdate } from '../../../api/waitlist'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
// import WaitlistForm from '../WaitlistForm/WaitlistForm'

class WaitlistUpdate extends Component {
  constructor () {
    super()

    this.state = {
      waitlist: null,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    waitlistShow(match.params.id, user)
      .then(res => this.setState({ waitlist: res.data.waitlist }))
      .then(() => {
        msgAlert({
          heading: 'Success!',
          message: 'You may now edit this waitlist.',
          variant: 'light'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Something went wrong...',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { waitlist } = this.state

    waitlistUpdate(waitlist, match.params.id, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Success!',
          message: 'Waitlist has been updated.',
          variant: 'light'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Something went wrong...',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    this.setState({ waitlist: { ...this.state.waitlist, [event.target.name]: event.target.value } })
  }

  render () {
    const { waitlist, name, updated } = this.state
    if (!waitlist) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    if (updated) {
      return <Redirect to={`/waitlists/${this.props.match.params.id}`} />
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto ">
          <h2 className="text-center mt-5">What&apos;s The Wait?</h2>
          <h5 className="text-center mb-4">Edit Waitlist</h5>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="mb-3">
              <Form.Group as={Col} controlId="name" className="mr-3">
                <Form.Label>Waitlist Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={name}
                  placeholder={waitlist.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <div className="text-center mt-5=3">
              <Button className="text-center" size="lg" variant="primary" type="submit">
              Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(WaitlistUpdate)
