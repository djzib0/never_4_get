import EntryDetails from '@/components/entriesPageContent/entryDetails/EntryDetails';
import { EntryType } from '@/lib/types';
import { getEntryData } from '@/lib/utils';
import React from 'react';

const EntryPage = async ({params}: {params: Promise<{entryId: string}>}) => {

  const {entryId} = await params;
  const entryData: EntryType = await getEntryData(entryId);

  

  return (
    <>
      <EntryDetails entryData={entryData} entryId={entryId} />  
    </>
  )
}

export default EntryPage