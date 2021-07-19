import Sidebar from './Sidebar'
import OpenChatWindow from './OpenChatWindow'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function MainInterface({ myId, myUsername }) {
  const { selectedChatroom } = useChatrooms()

  return (
    <div className="d-flex" style={{ height: '100vh'}}>
      <Sidebar myId={myId} myUsername={myUsername} />
      { selectedChatroom && <OpenChatWindow myId={myId} myUsername={myUsername}/> }
    </div>
  )
}
