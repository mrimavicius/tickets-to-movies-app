import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext'

const LoginPage = () => {

  const nav = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const { socket, setOnlineUser } = useContext(mainContext)

  const [error, setError] = useState('')

  async function login() {
    setError("")
    
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`http://localhost:4000/log_user`, options);

    const data = await res.json(); 

    console.log(data)

    if (!data.error) {
      setOnlineUser(data.data)
      socket.emit("request-movies")
      nav("/movies");
    }

    if (data.error) {
      setError(data.message)
    }
  }

  return (
    <>
      <div className="form d-flex flex-col">

        <h2>Watch best movies here!</h2>

        <input ref={emailRef} type="text" placeholder="email" />
        <input ref={passwordRef} type="password" placeholder="password" />

        {error.length > 0 && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <button onClick={login}>Log in</button>
        
      </div>

      <div className="form-ext">
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>{" "}
        </p>
      </div>
    </>
  );
}

export default LoginPage