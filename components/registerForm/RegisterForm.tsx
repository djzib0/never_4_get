'use client'
import { registerNewUser } from '@/lib/actions'
import React, { useActionState, useState } from 'react'
import Button from '../button/Button'
import Link from 'next/link'

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
      <form 
        action={formAction} 
        className='flex flex-col bg-[#DEE5D4] dark:bg-[#697565] w-full p-4 rounded-md'

      >

        <label 
          htmlFor='username' 
          className='text-[#697565] dark:text-[#ECDFCC]'
        >
          Username
        </label>
        <input
          className='form__input'
          type='text'
          id='username'
          name='username'
          required
        />

        <label 
          htmlFor='password' 
          className='text-[#697565] dark:text-[#ECDFCC]'
        >
          Password
        </label>
        <input
          className='form__input'
          type='password'
          id='password'
          name='password'
          required
        />

        <label 
          htmlFor='password' 
          className='text-[#697565] dark:text-[#ECDFCC]'
        >
          Password repeat
        </label>
        <input
          className='form__input'
          type='password'
          id='passwordRepeat'
          name='passwordRepeat'
          required
        />
        {state?.error && <p>{state?.error}</p>}

        <label 
          htmlFor='password' 
          className='text-[#697565] dark:text-[#ECDFCC]'
        >
          Email
        </label>
        <input
          className='form__input'
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
        <div className='flex flex-row justify-between items-center mt-4'>
          <Button btnHtmlType='submit' title='register' btnVariant='positive' btnHeight='medium' btnWidth='full' />
        </div>
        <div className='flex flex-row mt-4'>
          <p className='mr-2'>Already have an account?</p>
          <Link href="/login">
            <b className='text-blue-500'>Login</b>
          </Link>
        </div>
      </form>
    </>
  )
}

export default RegisterForm