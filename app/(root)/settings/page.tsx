import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const SettingsPage = async () => {

  const session = await auth();

  if (!session?.user?.id) {
      redirect("/login")
    }
  
  return (
    <div>SettingsPage</div>
  )
}

export default SettingsPage