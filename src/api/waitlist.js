import apiUrl from '../apiConfig'
import axios from 'axios'

export const waitlistCreate = (waitlist, user) => {
  return axios({
    url: apiUrl + '/waitlists',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      waitlist: {
        name: waitlist.name
      }
    }
  })
}

export const waitlistShow = (id, user) => {
  return axios({
    url: apiUrl + '/waitlists/' + id,
    method: 'GET'
  })
}

export const waitlistIndex = (user) => {
  return axios({
    url: apiUrl + '/waitlists',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const waitlistUpdate = (waitlist, id, user) => {
  return axios({
    url: apiUrl + '/waitlists/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      waitlist: {
        name: waitlist.name
      }
    }
  })
}

export const waitlistDelete = (id, user) => {
  return axios({
    url: apiUrl + '/waitlists/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
