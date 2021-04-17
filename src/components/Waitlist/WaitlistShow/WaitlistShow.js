import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { waitlistShow, waitlistDelete } from '../../../api/waitlist'

class WaitlistShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      waitlist: {
        name: '',
        guests: []
      },
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    waitlistShow(match.params.id, user)
      .then(res => this.setState({ waitlist: res.data.waitlist }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: 'I present to you, your waitlist.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Something went wrong...',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    waitlistDelete(match.params.id, user)
      .then(() => this.setState({ deleted: true }))
      .then(res => msgAlert({
        heading: 'Success!',
        message: 'Waitlist has been deleted.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Something went wrong...',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { waitlist, deleted } = this.state
    if (!waitlist) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (deleted) {
      return <Redirect to="/waitlists" />
    }

    const guestJsx = waitlist.guests.map(guest => (
      <div key={waitlist.guests._id}>
        <li>{waitlist.guests}</li>
      </div>
    ))

    return (
      <div>
        <h3>{waitlist.name}</h3>
        <h5>{guestJsx}</h5>
        <Button onClick={this.handleDelete}>Delete Waitlist</Button>
        <Link to={`/waitlists/${waitlist._id}/edit`}>
          <Button renderas='button'>Edit Waitlist</Button>
        </Link>
      </div>
    )
  }
}
export default withRouter(WaitlistShow)