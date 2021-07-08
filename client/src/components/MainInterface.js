import React from 'react'
import Sidebar from './Sidebar'

export default function MainInterface({ myId, myUsername }) {
  return (
    <div className="d-flex" style={{ height: '100vh'}}>
      <Sidebar myId={myId} myUsername={myUsername} />
    </div>
  )
}
