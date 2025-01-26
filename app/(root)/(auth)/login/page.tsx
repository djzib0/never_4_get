import { auth } from '@/auth'
import LoginForm from '@/components/loginForm/LoginForm'
import React from 'react'

const LoginPage = async () => {

  const session = await auth()

  return (
    <>
      <LoginForm />
      <p>::{session && session.user?.name}::</p>
      <p>::{session && session.user?.email}::</p>
      <p>::{session && session.user?.id}::</p>
    </>
  )
}

export default LoginPage