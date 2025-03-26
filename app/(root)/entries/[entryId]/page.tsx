import EntryCommentForm from '@/components/entryDetails/entryCommentForm/EntryCommentForm';
import EntryDetails from '@/components/entryDetails/EntryDetails';
import EntryMenu from '@/components/entryDetails/entryMenu/EntryMenu';
import EntryPosition from '@/components/entryPosition/EntryPosition';
import { EntryPositionType, EntryType } from '@/lib/types';
import { getEntryData } from '@/lib/utils';
import React from 'react';

const EntryPage = async ({params}: {params: Promise<{entryId: string}>}) => {

  const {entryId} = await params;
  const entryData: EntryType[] = await getEntryData(entryId);

  

  return (
    <>
      <EntryDetails entryData={entryData} entryId={entryId} />  
    </>
  )
}

export default EntryPage