import { useState, useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useUsers } from '../contexts/UsersProvider'

export default function Login( { value, onChange, idValue, onIdSubmit, isLoggedIn, setLogin }) {
  const { users, createUser } = useUsers()
  const [newUser, setNewUser] = useState(false)
  const usernameRef = useRef()

  function isNewUser(username) {
    for (let i = 0; i < users.length; i++) {
      (users[i].username !== username) ? setNewUser(true) : setNewUser(false)
    }
  }

  function generateRandomUsername() {
    const rugName = require('random-username-generator').generate().slice(-10).replace(/-/g, '')
    onChange(rugName)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const username = usernameRef.current.value
    isNewUser(username)
    let id
    if (users.length === 0 || newUser) {
      id = uuidV4().slice(0, 7)
      onIdSubmit(id)
      createUser(id, username)
      console.log('new user')
    }
    if (!id && !newUser) {
      console.log('old user')
      onChange(username)
      console.log(users)
      onIdSubmit(users.find(user => user.username === username).id)
    }
    setLogin(true)
  }

  return (
    <Container className="justify-content-center align-items-center d-flex" style={{ height: "100vh"}}>

     <Form onSubmit={handleSubmit} className="w-50 border rounded">
        <div className="rounded-top bg-blue py-3 text-white text-center fs-4">
          Chatroom
        </div>
        <div className="p-4">
          <Form.Group className="mb-3">
            <Form.Label className="mb-2">Username</Form.Label>
            <Form.Control
              type="text"
              ref={usernameRef}
              value={value}
              onClick={(e) => e.preventDefault() || onChange(e.target.value)}
              required>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="me-2">Login</Button>
          <Button variant="secondary" onClick={generateRandomUsername}>Random Username</Button>
        </div>
      </Form>
    </Container>
  )
}
