import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import Image from 'react-bootstrap/Image'
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

  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    waitlistDelete(match.params.id, user)
      .then(() => this.setState({ deleted: true }))
      .then(res => msgAlert({
        heading: 'Success!',
        message: 'Waitlist has been deleted.',
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
    let guestJsx
    const { waitlist, deleted } = this.state
    if (!waitlist) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
      guestJsx = (
        waitlist.guests.map(guest => (
          <Fragment key={guest._id}>
            <tr>
              <td>{waitlist.guests.indexOf(guest) + 1}</td>
              <td><Moment format='hh:mm A'>{guest.createdAt}</Moment></td>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.count}</td>
              <td>{guest.notes}</td>
              <td>{guest.quote}</td>
              <td><Moment fromNow ago>{guest.createdAt}</Moment></td>
              <td>
                <Link to={`/guests/${waitlist._id}/${guest._id}`} key={guest._id}>
                  <Image
                    src="https://icongr.am/entypo/check.svg?size=25&color=29a745"
                    alt="Sit"
                    className="mr-3"
                  ></Image>
                </Link>
                <Link to={`/guests/${waitlist._id}/${guest._id}`} key={guest._id}>
                  <Image
                    src="https://icongr.am/entypo/trash.svg?size=25&color=dc3545"
                    alt="Delete"
                    className="mr-3"
                  ></Image>
                </Link>
                <Link to={`/guests/${waitlist._id}/${guest._id}`} key={guest._id}>
                  <Image
                    src="https://icongr.am/entypo/pencil.svg?size=25&color=047bff"
                    alt="Edit"
                    className="mr-3"
                  ></Image>
                </Link>
                <Link to={'#'} key={guest._id}>
                  <Image
                    src="https://icongr.am/entypo/message.svg?size=25&color=333333"
                    alt="Text"
                  ></Image>
                </Link>
              </td>
            </tr>
          </Fragment>
        ))
      )
    }

    if (deleted) {
      return <Redirect to="/waitlists" />
    }

    return (
      <div className="row text-center">
        <div>
          <h2 className="text-center mt-5">What&apos;s The Wait?</h2>
          <h3 className="text-center mt-2 mb-3">{waitlist.name}</h3>
          <Link to={`/waitlists/${waitlist._id}/edit`}>
            <Button className="mr-4" variant="outline-primary">Update Waitlist</Button>
          </Link>
          <Button variant="outline-danger" onClick={this.handleDelete}>Delete Waitlist</Button>
          <Table striped bordered hover className="text-center mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Added</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Guests</th>
                <th>Notes</th>
                <th>Quote</th>
                <th>Wait</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guestJsx}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
export default withRouter(WaitlistShow)
