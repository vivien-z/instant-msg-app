import React, { useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ myId, children }) {
  const [socket, setSocket] = useState(null)
  const io = require("socket.io-client")
  const ENDPOINT = 'https://instant-msg-app.herokuapp.com/' || 'http://localhost:8080'
  // const ENDPOINT = 'http://localhost:8080'
  useEffect(() => {
    const newSocket = io(
      ENDPOINT,
      {
        query: {myId},
        withCredentials: true
        // extraHeaders: {
        //   "instant-msg-page": "abcd"
        // }
      }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [io, myId, ENDPOINT])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
