import { ListGroup } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function Chatrooms({ myId, myUsername }) {
  const { chatrooms, selectChatroomIndex } = useChatrooms()

  function otherRoomUsers(chatroom) {
    return chatroom.roomUsers.filter(user => user.username !== myUsername).map(user => user.username)
  }

  function isMyChatroom(chatroom) {
    return chatroom.roomUsers.length !== otherRoomUsers(chatroom).length
  }

  function listChatroomUsers(chatroom) {
    if (isMyChatroom(chatroom)) {
      return otherRoomUsers(chatroom).join(', ') + ', me'
    } else {
      return otherRoomUsers(chatroom).join(', ')
    }
  }

  return (
    <>
      <ListGroup variant="flush">

        {chatrooms.map((chatroom, i) => (
            <ListGroup.Item
              key={i}
              action // bootstrap function make it selectable
              onClick={() => {selectChatroomIndex(i)}}
              active={chatroom.selected}
            >
              {listChatroomUsers(chatroom)}
            </ListGroup.Item>
        ))}

      </ListGroup>
    </>
  )
}
