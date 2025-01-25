import { auth } from '@/auth'
import LoginForm from '@/components/loginForm/LoginForm'
import React from 'react'

const LoginPage = async () => {

  const session = await auth()

  return (
    <>
      <LoginForm />
      ::{session && session.user?.email}::
    </>
  )
}

export default LoginPage