import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { waitlistCreate } from '../../../api/waitlist.js'
import WaitlistForm from '../WaitlistForm/WaitlistForm'

class WaitlistCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      waitlist: {
        name: ''
      },
      waitlistId: null
    }
  }
  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { waitlist } = this.state

    waitlistCreate(waitlist, user)
      .then(res => {
        this.setState({ waitlistId: res.data.waitlist._id })
        return res
      })
      .then(res => msgAlert({
        heading: 'Success!',
        message: `${res.data.waitlist.name} waitlist has been created.`,
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
        waitlist: { ...state.waitlist, [event.target.name]: event.target.value }
      }
    })
  }
  render () {
    const { name, waitlistId } = this.state
    if (waitlistId) {
      return <Redirect to={'/waitlists'} />
    }
    return (
      <div>
        <h2 className="text-center mt-5">What&apos;s The Wait?</h2>
        <h5 className="text-center mb-4">Create a Waitlist</h5>
        <WaitlistForm
          name={name}
          placeholder="ex. 'Friday PM' or 'Father&apos;s Day'"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
export default WaitlistCreate
