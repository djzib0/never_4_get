'use client'
import { registerNewUser } from '@/lib/actions'
import React, { useActionState, useState } from 'react'

const RegisterForm = () => {

  const [state, formAction] = useActionState(registerNewUser, {
    username: "",
    password: "",
    passwordRepeat: "",
    email: "",
    error: "",
  })


  // handling hidden data which will not be provided by user
  const [hiddenFormData, setHiddenFormData] = useState({
    img: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value, type} = e.target
    setHiddenFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
      }
    })
  }

  return (
    <>
      <form action={formAction} className='form__container'>

        <label htmlFor='username' className='label'>username</label>
        <input
          type='text'
          id='username'
          name='username'
          required
        />

        <label htmlFor='password' className='label'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
        />

        <label htmlFor='passwordRepeat' className='label'>Password repeat</label>
        <input
          type='password'
          id='passwordRepeat'
          name='passwordRepeat'
          required
        />
        {state?.error && <p>{state?.error}</p>}

        <label htmlFor='email' className='label'>Email</label>
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
          value={hiddenFormData.img}
          onChange={handleChange}
          hidden
        />
      <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default RegisterForm