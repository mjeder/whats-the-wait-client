import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import WaitlistRow from '../WaitlistRow/WaitlistRow'
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
        message: 'Click on a waitlist to go to its page.',
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
    let waitlistJsx
    const { waitlists } = this.state

    if (this.state.waitlists === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
      waitlistJsx = waitlists.map(waitlist => (
        <tbody key={waitlist._id}>
          <tr>
            <WaitlistRow
              name={waitlist.name}
              createdAt={waitlist.createdAt}/>
          </tr>
        </tbody>
      ))
    }

    return (
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created On</th>
          </tr>
        </thead>
        {waitlistJsx}
      </Table>
    )
  }
}

export default WaitlistIndex
