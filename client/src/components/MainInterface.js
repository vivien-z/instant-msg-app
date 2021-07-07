import React from 'react'
import Sidebar from './Sidebar'

export default function MainInterface({ id, username }) {
  return (
    <div className="d-flex" style={{ height: '100vh'}}>
      <Sidebar id={id} username={username} />
    </div>
  )
}
