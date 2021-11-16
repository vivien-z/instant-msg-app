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
              {/*<div className="px-2 text-muted small">Id: {contact.id}</div>*/}
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
}

