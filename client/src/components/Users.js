import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider';

export default function Users({ myUsername }) {
  const { users } = useUsers()

  function filterContacts(myUsername, users) {
    if (myUsername) {
      return users.filter((user) => (
        user.username !== myUsername
      ))
    } else {
      return users
    }
  }
  const contacts = filterContacts(myUsername, users)

  return (
    <ListGroup variant="flush">

        {contacts.map((contact, i) => (
          <ListGroup.Item key={i}>
              {contact.username}
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
}
