import { Button } from 'react-bootstrap'

export default function Header({ myId, myUsername, isLoggedIn, setLogin }) {

  return (
    <div className="">
      {isLoggedIn ?
        (<>
          <h2>Header {myId} {myUsername}</h2>
          <Button onClick={() => setLogin(false)} className="mt-2 me-2">Log Out</Button>
         </>) : <></>
      }
    </div>
  )
}
