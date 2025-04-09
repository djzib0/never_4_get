import { auth } from '@/auth';
import { getEntriesData } from '@/lib/actions';
import { redirect } from 'next/navigation';
import React from 'react'
import EntriesPageContent from '@/components/entriesPageContent/EntriesPageContent';

const EntriesPage = async () => {

  const session = await auth();

  
  if (!session?.user?.id) {
    redirect("/login")
  }

  const entries = session.user.id && await getEntriesData(session.user.id);

  return (
    <div className='content__container '>
      <div className='flex flex-col gap-2'>
        <EntriesPageContent entries={entries} />
      </div>
    </div>
  )
}

export default EntriesPage