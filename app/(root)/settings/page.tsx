import { auth } from '@/auth'
import SettingsPageContent from '@/components/settingsPageContent/SettingsPageContent';
import { redirect } from 'next/navigation';
import React from 'react'

const SettingsPage = async () => {

  const session = await auth();

  if (!session?.user?.id) {
      redirect("/login")
    }
  
  return (
    <div className='content__container'>
      <SettingsPageContent userId={session.user.id} />
    </div>
  )
}

export default SettingsPage