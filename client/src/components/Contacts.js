import { ListGroup } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider';

export default function Contacts({ myUsername }) {
  const { users } = useUsers()
  const contacts = users.find(user => user.username === myUsername).contacts

  return (
    <ListGroup variant="flush">

        {contacts.map((contact, i) => (
          <ListGroup.Item key={i}>
              {users.find(user => user.id === contact.id).username}
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
}
