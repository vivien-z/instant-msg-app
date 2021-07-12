import React, { useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ myId, children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      {
        // query: {myId},
        withCredentials: true
      }
    )
    setSocket(newSocket)
    return () => newSocket.close()
  }, [myId])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
