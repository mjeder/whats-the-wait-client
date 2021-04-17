import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
// Auth
import SignUp from './components/Authentication/SignUp/SignUp'
import SignIn from './components/Authentication/SignIn/SignIn'
import SignOut from './components/Authentication/SignOut/SignOut'
import ChangePassword from './components/Authentication/ChangePassword/ChangePassword'
// Waitlist
import WaitlistCreate from './components/Waitlist/WaitlistCreate/WaitlistCreate'
import WaitlistShow from './components/Waitlist/WaitlistShow/WaitlistShow'
import WaitlistIndex from './components/Waitlist/WaitlistIndex/WaitlistIndex'
import WaitlistUpdate from './components/Waitlist/WaitlistUpdate/WaitlistUpdate'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* SIGN UP */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* SIGN IN */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* SIGN OUT */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          {/* CHANGE PASSWORD */}
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          {/* WAITLIST - CREATE */}
          <AuthenticatedRoute user={user} path='/create-waitlist' render={() => (
            <WaitlistCreate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* WAITLIST - SHOW */}
          <AuthenticatedRoute user={user} exact path='/waitlists/:id' render={() => (
            <WaitlistShow msgAlert={this.msgAlert} user={user} />
          )} />
          {/* WAITLIST - INDEX */}
          <AuthenticatedRoute user={user} exact path='/waitlists' render={() => (
            <WaitlistIndex msgAlert={this.msgAlert} user={user} />
          )} />
          {/* WAITLIST - UPDATE */}
          <AuthenticatedRoute user={user} path='/waitlists/:id/edit' render={() => (
            <WaitlistUpdate msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
