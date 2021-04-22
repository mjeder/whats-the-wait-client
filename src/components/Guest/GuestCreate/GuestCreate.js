import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { guestCreate } from '../../../api/guest.js'
// import { waitlistShow } from '../../../api/waitlist.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class GuestCreate extends Component {
  constructor (props) {
    super(props)
    // const { match } = this.props

    this.state = {
      guest: {
        name: '',
        count: '',
        phone: '',
        quote: '',
        notes: ''
      },
      guestId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { guest } = this.state

    guestCreate(match.params.waitlistId, guest, user)
      .then(res => {
        this.setState({ guestId: res.data.guest._id })
        return res
      })
      .then(res => msgAlert({
        heading: 'Success!',
        message: `${res.data.guest.name} party has been created and added to waitlist.`,
        variant: 'light'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Something went wrong...',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    event.persist()

    this.setState(state => {
      return {
        guest: { ...state.guest, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { guest, guestId } = this.state
    if (guestId) {
      return <Redirect to={'/waitlists/'} />
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto justify-content">
          <div>
            <img src="logo3.png" className="mx-auto d-block mt-4 mb-3"/>
          </div>
          <h4 className="text-center mt-3 mb-4">Add Guest To Waitlist</h4>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="mb-3">
              <Form.Group as={Col} controlId="name">
                <Form.Label>Guest Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={guest.name}
                  placeholder="John Doe"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="count">
                <Form.Label>Guest Count</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="count"
                  value={guest.count}
                  placeholder="4"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="phone" className="mr-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  name="phone"
                  value={guest.phone}
                  type="text"
                  placeholder="3124445555"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="quote">
                <Form.Label>Wait Quoted</Form.Label>
                <Form.Control
                  required
                  name="quote"
                  value={guest.quote}
                  type="text"
                  placeholder="30-45"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="notes">
                <Form.Label>Notes (optional)</Form.Label>
                <Form.Control
                  name="notes"
                  value={guest.notes}
                  type="text"
                  placeholder="'Booster seat', 'Table by TV', etc."
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <div className="text-center mt-4">
              <Button className="text-center" size="lg" variant="flat" type="submit">Add to Waitlist</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
export default withRouter(GuestCreate)
