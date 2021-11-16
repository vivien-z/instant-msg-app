import { Button } from 'react-bootstrap'

export default function Header({ myId, myUsername, isLoggedIn, setLogin, setMyUsername,setMyId }) {

  function logout() {
    setLogin(false)
    setMyUsername('')
    setMyId('')
  }

  return (
    <div className="header py-2 px-3 d-flex justify-content-between">
      <h2 className="">Instant Message</h2>
      {isLoggedIn ?
        (<div className="d-flex align-items-center">
            <p className="mb-0 me-2">Hi: {myUsername}</p>
            <Button onClick={() => logout()}>Log Out</Button>
          </div>) :
        <></>
      }
    </div>
  )
}
