import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { waitlistShow, waitlistDelete } from '../../api/waitlist'

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
        heading: 'Waitlist Fetched Succesfully',
        message: 'Waitlist is being viewed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Waitlist Failed',
          message: 'Failed to show waitlist with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    waitlistDelete(match.params.id, user)
      .then(() => this.setState({ deleted: true }))
      .then(res => msgAlert({
        heading: 'Deleted Waitlist Succesfully',
        message: 'Waitlist has been Deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Delete Waitlist',
          message: 'Could not delete waitlist with error: ' + error.message,
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
      <div key={waitlist.guest}>
        <li>{waitlist.guest}</li>
      </div>
    ))
    return (
      <div>
        <h3>{waitlist.name}</h3>
        <Button onClick={this.handleDelete}>Delete Waitlist</Button>
        <Link to={`/waitlists/${waitlist._id}/edit`}>
          <Button renderas='button'>
            Edit Waitlist
          </Button>
        </Link>
        <p>{guestJsx}</p>
      </div>
    )
  }
}
export default withRouter(WaitlistShow)
