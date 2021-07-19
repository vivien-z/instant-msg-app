import { ListGroup } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider';

export default function Contacts({ myUsername }) {
  const { users } = useUsers()
  const contacts = users.filter(user => {
    return user.username !== myUsername
  })

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

