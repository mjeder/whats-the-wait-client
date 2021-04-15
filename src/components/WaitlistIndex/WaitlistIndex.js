import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { waitlistIndex } from '../../api/waitlist'

class WaitlistIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      waitlists: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    waitlistIndex(user)
      .then(res => this.setState({ waitlists: res.data.waitlists }))
      .then(() => msgAlert({
        heading: 'Loaded Waitlists Successfully',
        message: 'All waitlists retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Waitlists!',
          message: 'Could not load waitlists with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { waitlists } = this.state

    if (!waitlists) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const waitlistsJsx = waitlists.map(waitlist => (
      <Link to={`/waitlists/${waitlist._id}`} key={waitlist._id}>
        <li>
          {waitlist.name}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Waitlists</h3>
        <ul>
          {waitlistsJsx}
        </ul>
      </div>
    )
  }
}

export default WaitlistIndex
