import React from 'react'

const WaitlistRow = ({ name, createdAt }) => (
  <React.Fragment>
    <tr>
      <td>{name}</td>
      <td>{createdAt}</td>
    </tr>
  </React.Fragment>
)

// Link buttons to view, edit, and delete
// <td>
//   <Link to={`/waitlists/${waitlist._id}`} key={waitlist._id}>
//     <Button className="mr-3" variant="outline-success">View</Button>
//   </Link>
//   <Link to={`/waitlists/${waitlist._id / edit}`} key={waitlist._id}>
//     <Button variant="outline-primary">Edit</Button>
//   </Link>
// </td>

export default WaitlistRow
