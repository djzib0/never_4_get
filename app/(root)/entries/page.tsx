import { auth } from '@/auth';
import EntryForm from '@/components/entryForm/EntryForm';
import { redirect } from 'next/navigation';
import React from 'react'

const getEntry = async () => {
  const res = await fetch('http://localhost:3000/api/entries')

  if (!res.ok) {
    throw new Error("Something went wrong")
  }

  return res.json();
}

const EntriesPage = async () => {

  const session = await auth();
  const entry = await getEntry();

  console.log(entry, " entry")
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <>
      <EntryForm userId={session.user.id}/> 
      <p>
        "{entry.title}"
      </p>
    </>
  )
}

export default EntriesPage