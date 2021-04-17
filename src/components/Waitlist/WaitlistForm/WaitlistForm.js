import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const WaitlistForm = ({ name, placeholder, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Waitlist Name</Form.Label>
      <Form.Control
        required
        type="text"
        name="name"
        value={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>
)

export default WaitlistForm
