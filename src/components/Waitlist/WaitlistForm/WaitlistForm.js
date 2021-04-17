import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const WaitlistForm = ({ name, placeholder, handleSubmit, handleChange }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto ">
      <Form onSubmit={handleSubmit}>
        <Form.Row className="mb-3">
          <Form.Group as={Col} controlId="name" className="mr-3">
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
        </Form.Row>
        <div className="text-center mt-5=3">
          <Button className="text-center" size="lg" variant="primary" type="submit">
          Submit
          </Button>
        </div>
      </Form>
    </div>
  </div>
)

export default WaitlistForm
