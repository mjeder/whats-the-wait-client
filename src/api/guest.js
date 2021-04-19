import apiUrl from '../apiConfig'
import axios from 'axios'

export const guestCreate = (waitlistId, guest, user) => {
  return axios({
    url: apiUrl + '/guests/' + waitlistId,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      guest: {
        name: guest.name,
        count: guest.count,
        phone: guest.phone,
        quote: guest.quote,
        notes: guest.notes
      }
    }
  })
}

export const guestUpdate = (waitlistId, guestId, guest, user) => {
  return axios({
    url: apiUrl + '/guests/' + waitlistId + guestId,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      guest: {
        name: guest.name,
        count: guest.count,
        phone: guest.phone,
        quote: guest.quote,
        notes: guest.notes
      }
    }
  })
}

export const guestDelete = (waitlistId, guestId, user) => {
  return axios({
    url: apiUrl + '/waitlists/' + waitlistId + guestId,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
