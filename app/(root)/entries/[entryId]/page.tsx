import EntryCommentForm from '@/components/entryCommentForm/EntryCommentForm';
import EntryPosition from '@/components/entryPosition/EntryPosition';
import EntryPositionForm from '@/components/entryPositionForm/EntryPositionForm';
import { EntryPositionType } from '@/lib/types';
import { getEntryData } from '@/lib/utils';
import React from 'react';

const EntryPage = async ({params}: {params: Promise<{entryId: string}>}) => {

  const {entryId} = await params;
  const entryData = await getEntryData(entryId);

  const entryPositionsArr = entryData.positions.map((position: EntryPositionType) => {
    return (
      <EntryPosition key={position._id} entryPosition={position} />
    )
  })

  return (
    <div>
      <EntryPositionForm entryId={entryId}/>
      <EntryCommentForm entryId={entryId} />
      {entryPositionsArr}
    </div>
  )
}

export default EntryPage