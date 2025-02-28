import { auth } from '@/auth'
import EntryForm from '@/components/entryForm/EntryForm'
import { redirect } from 'next/navigation';
import React from 'react'

const AddEntryPage = async () => {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className='content__container '>
        <EntryForm userId={session.user.id}/> 
    </div>
  )
}

export default AddEntryPage