'use client'
import { signOut } from '@/auth';
import { login } from '@/lib/actions'
import React, { useActionState, useState } from 'react'

const LoginForm = () => {


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useActionState(login, null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const toggleHidePassword = () => {
    setIsPasswordHidden(prevState => !prevState)
  }

  return (
    <>
      <form action={formAction}>

        <label htmlFor='username'>Login</label>
        <input
            type='text'
            name='username'
            required
          />

        <label htmlFor='password'>Password</label>
        <input
            type={isPasswordHidden ? "password" : ""}
            name='password'
            required
          />
      <button type='button' onClick={toggleHidePassword}>{isPasswordHidden ? "Show password" : "Hide password"}</button>
      <button type='submit'>Login</button>
      </form>
      <button onClick={() =>signOut()}>Logout</button>
    </>
  )
}

export default LoginForm