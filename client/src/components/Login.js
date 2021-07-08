import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useUsers } from '../contexts/UsersProvider' //

export default function Login( { value, onIdSubmit, onChange }) {
  const usernameRef = useRef()
  const { createUser } = useUsers() //

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    // return rug.generate()
    // onUsernameSubmit(rug.generate())
    onChange(rug.generate())
  }

  function handleSubmit(e) {
    const id = uuidV4()
    const username = usernameRef.current.value

    e.preventDefault()
    // onUsernameSubmit(username)
    onChange(username)
    onIdSubmit(id)
    createUser(id, username) //
  }

  return (
    <Container className="align-items-center d-flex" style={{ height: "100vh"}}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mb-2">
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control
            type="text"
            ref={usernameRef}
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            required>
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button variant="secondary" onClick={generateRandomUsername}>New Username</Button>
      </Form>
    </Container>
  )
}
