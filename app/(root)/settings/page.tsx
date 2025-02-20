import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const SettingsPage = async () => {

  const session = await auth();

  if (!session?.user?.id) {
      redirect("/login")
    }
  
  return (
    <div className='content__container'>
      Settings Container
    </div>
  )
}

export default SettingsPage