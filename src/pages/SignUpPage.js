import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const nav = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const password2Ref = useRef()
  const ageRef = useRef()

  const [error, setError] = useState('')

  async function createUser(){
    setError("")

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;
    const age = ageRef.current.value

    const newUser = {
      email, password, password2, age
    }

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    const res = await fetch(`http://localhost:4000/create_user`, options);

    const data = await res.json(); 

    console.log(data)

    if (!data.error) {
      nav("/");
    }

    if (data.error) {
      setError(data.message);
    }
  }

  return (
    <>
      <div className="form d-flex flex-col">

        <input ref={emailRef} type="text" placeholder="email"/>
        <input ref={passwordRef} type="password" placeholder="password" />
        <input ref={password2Ref} type="password" placeholder="repeat password" />
        <input ref={ageRef} type="number" placeholder="age" />

        {error.length > 0 && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <button onClick={createUser}>Sign up</button>

      </div>
      
      <div className="form-ext">
        <p>
          Already have an account? <Link to={"/"}>Log in</Link>{" "}
        </p>
      </div>
    </>
  );
}

export default SignUpPage