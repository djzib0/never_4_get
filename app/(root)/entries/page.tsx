import { auth } from '@/auth';
import EntryElement from '@/components/entryElement/EntryElement';
import { EntryType } from '@/lib/types';
import { getEntriesData } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const EntriesPage = async () => {

  const session = await auth();

  const entries = await getEntriesData();

  // map through entries to display links to entry details
  const entriesLinksArr = entries.map((entry: EntryType) => {
    return (
      <EntryElement
        key={entry._id}
        id={entry._id}
        title={entry.title}
        isActive={entry.isActive}
        isFavourite={entry.isFavourite}
        positionsNumber={entry.positions.length}
        commentsNumber={entry.comments.length}
      />
    )
  })
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className='content__container '>
      <div className='flex flex-col gap-2'>
        {entriesLinksArr}
      </div>
    </div>
  )
}

export default EntriesPage