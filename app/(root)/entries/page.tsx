import { auth } from '@/auth';
import EntryForm from '@/components/entryForm/EntryForm';
import { EntryType } from '@/lib/types';
import { getEntriesData } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const EntriesPage = async () => {

  const session = await auth();

  const entries = await getEntriesData();

  // map through entries to display links to entry details
  const entriesLinksArr = entries.map((entry: EntryType) => {
    return (
      <Link 
        href={`/entries/${entry._id}`} 
        key={entry._id}
      >
        {entry.title}
        {entry.comments.length}
      </Link>
    )
  })
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className='content__container '>
        <EntryForm userId={session.user.id}/> 
      <div className='flex flex-col gap-2 my-2 bg-slate-400 w-fit p-4'>
        {entriesLinksArr}
      </div>
    </div>
  )
}

export default EntriesPage