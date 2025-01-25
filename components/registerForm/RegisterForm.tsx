'use client'
import { registerNewUser } from '@/lib/actions'
import React, { useActionState } from 'react'

const RegisterForm = () => {

  const [state, formAction] = useActionState(registerNewUser, {
    userName: "",
    password: "",
    passwordRepeat: "",
    email: "",
    errors: "",
  })

  return (
    <>
      <form action={formAction}>

        <label htmlFor='userName'>Username</label>
        <input
          type='text'
          id='userName'
          name='userName'
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
        />

        <label htmlFor='passwordRepeat'>Password repeat</label>
        <input
          type='password'
          id='passwordRepeat'
          name='passwordRepeat'
          required
        />
        {state?.error && <p>{state?.error}</p>}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
        />

        <input
          type='img'
          id='img'
          name='img'
          hidden
        />
      <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default RegisterForm