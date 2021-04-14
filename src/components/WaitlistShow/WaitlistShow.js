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
    const { match, msgAlert } = this.props

    waitlistShow(match.params.id)
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
    const { waitlist, name, deleted } = this.state
    if (!waitlist) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (deleted) {
      return <Redirect to="/" />
    }
    const guestJsx = waitlist.guests.map(guest => (
      <div key={guest.guest}>
        <li>{guest.guest}</li>
      </div>
    ))
    return (
      <div>
        <h3>{name}</h3>
        <h4>WaitlistID: {waitlist._id}</h4>
        <h4>Response: {guestJsx} </h4>
        <Button onClick={this.handleDelete}>Delete Waitlist</Button>
        <Link to={`/waitlists/${waitlist._id}/edit`}>
          <Button renderAs='button'>
            Edit Waitlist
          </Button>
        </Link>
      </div>
    )
  }
}
export default withRouter(WaitlistShow)
