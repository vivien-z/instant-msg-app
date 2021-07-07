import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts } = useContacts()

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
