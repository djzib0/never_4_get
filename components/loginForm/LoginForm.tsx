'use client'
import { handleSignIn } from '@/lib/actions'
import React, { useActionState, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import Button from '../button/Button';

const LoginForm = () => {


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useActionState(handleSignIn, null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const toggleHidePassword = () => {
    setIsPasswordHidden(prevState => !prevState)
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
          Login
        </label>
        <input
            className='form__input'
            type='text'
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
            type={isPasswordHidden ? "password" : ""}
            name='password'
            required
        />
        <div className='flex flex-row justify-between items-center mt-4'>
          <Button btnHtmlType='submit' title='login' btnVariant='positive' btnHeight='medium' btnWidth='wider' />
          <button 
            type='button' 
            onClick={toggleHidePassword}
            className='text-[#697565] dark:text-[#ECDFCC] text-2xl mr-4'
          >
            {isPasswordHidden ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm