import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'

import { waitlistShow, waitlistUpdate } from '../../../api/waitlist'

import WaitlistForm from '../WaitlistForm/WaitlistForm'

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
          message: `Currently showing ${this.data.waitlist.name}.`,
          variant: 'success'
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

    waitlistUpdate(match.params.id, waitlist, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Success!',
          message: `${this.data.waitlist.name} has been updated.`,
          variant: 'success'
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
    const { waitlist, match, updated } = this.state
    if (!waitlist) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    if (updated) {
      return <Redirect to={`/waitlists/${match.params.id}`} />
    }

    return (
      <div>
        <h3>Edit Waitlist</h3>
        <WaitlistForm
          waitlist={name}
          placeholder={waitlist.name}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(WaitlistUpdate)
