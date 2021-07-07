import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function Login( { onUsernameSubmit }) {
  const usernameRef = useRef()

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    onUsernameSubmit(rug.generate())
  }

  // function setRandomUsername() {
  //   onChange(generateRandomUsername())
  // }

  function handleSubmit(e) {
    e.preventDefault()

    onUsernameSubmit(usernameRef.current.value)
  }

  return (
    <Container className="align-items-center d-flex" style={{ height: "100vh"}}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mb-2">
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control
            type="text"
            ref={usernameRef}
            // onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            required>
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button variant="secondary" onClick={generateRandomUsername}>New Username</Button>
      </Form>
    </Container>
  )
}
