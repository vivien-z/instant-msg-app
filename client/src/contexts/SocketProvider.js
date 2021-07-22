import React, { useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ myId, children }) {
  const [socket, setSocket] = useState(null)
  const ENDPOINT = 'https://instant-msg-us.herokuapp.com/' || 'http://localhost:8080'
  useEffect(() => {
    const newSocket = io(
      ENDPOINT,
      {
        // query: {myId},
        withCredentials: true
      }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [myId, ENDPOINT])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
