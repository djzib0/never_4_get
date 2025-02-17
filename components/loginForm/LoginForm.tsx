'use client'
import { handleSignIn } from '@/lib/actions'
import React, { useActionState, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

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
      className='flex flex-col dark:bg-[#697565] w-full p-4 rounded-md'
      >

        <label 
          htmlFor='username'
          className='text-[#ECDFCC]'
          >
          Login
        </label>
        <input
            type='text'
            name='username'
            required
            />

        <label 
          htmlFor='password'
          className='text-[#ECDFCC]'
        >
          Password
        </label>
        <input
            type={isPasswordHidden ? "password" : ""}
            name='password'
            required
        />
        <div className='flex flex-row justify-between items-center mt-4'>
          <button 
            type='submit' 
            className='w-4/5 py-2 dark:bg-[#ECDFCC] rounded-md font-bold uppercase tracking-widest'
          >
            Login
          </button>
          <button 
            type='button' 
            onClick={toggleHidePassword}
            className='text-[#ECDFCC] text-2xl mr-4'
          >
            {isPasswordHidden ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm