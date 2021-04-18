import React, { Component, Fragment } from 'react'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { waitlistIndex } from '../../../api/waitlist'

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
        heading: 'Success!',
        message: 'Click on a waitlist to go to its page OR Create one above!',
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

  render () {
    let waitlistJsx
    const { waitlists } = this.state
    const { user } = this.props
    if (!waitlists) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
      waitlistJsx = (
        waitlists.map(waitlist => (
          <Fragment key={waitlist._id}>
            <tr>
              <td>{waitlist.name}</td>
              <td><Moment format='MM-DD-YYYY'>{waitlist.createdAt}</Moment></td>
              <td>
                <Link to={`/waitlists/${waitlist._id}`} key={waitlist._id}>
                  <Button variant="outline-success">View Waitlist</Button>
                </Link>
              </td>
            </tr>
          </Fragment>
        ))
      )
    }

    return (
      <div className="text-center">
        <div>
          <h2 className="text-center mt-5">What&apos;s The Wait?</h2>
          <h4 className="text-center mt-4 mb-3">{user.restaurant}</h4>
          <Link to={'/create-waitlist'}>
            <Button variant="outline-success">Create Waitlist</Button>
          </Link>
          <Table striped bordered hover className="text-center mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {waitlistJsx}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default WaitlistIndex
