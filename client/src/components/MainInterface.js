import React from 'react'

export default function MainInterface({ id, username }) {
  return (
    <div>
      <p>{id}</p>
      {username}
    </div>
  )
}
