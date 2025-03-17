import EntryCommentForm from '@/components/entryCommentForm/EntryCommentForm';
import EntryMenu from '@/components/entryMenu/EntryMenu';
import EntryPosition from '@/components/entryPosition/EntryPosition';
import EntryPositionForm from '@/components/entryPositionForm/EntryPositionForm';
import { EntryPositionType } from '@/lib/types';
import { getEntryData } from '@/lib/utils';
import React from 'react';

const EntryPage = async ({params}: {params: Promise<{entryId: string}>}) => {

  const {entryId} = await params;
  const entryData = await getEntryData(entryId);


  const entryPositionsArr = entryData && entryData.positions.map((position: EntryPositionType) => {
    return (
      <EntryPosition key={position._id} entryPosition={position} entryId={entryId} />
    )
  })

  return (
    <div className='content__container'>
      <EntryMenu entry={entryData}/>
      <EntryPositionForm entryId={entryId}/>
      <EntryCommentForm entryId={entryId} />
      {entryPositionsArr}
    </div>
  )
}

export default EntryPage