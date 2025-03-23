import EntryMenu from '@/components/entryMenu/EntryMenu';
import EntryPosition from '@/components/entryPosition/EntryPosition';
import { EntryPositionType } from '@/lib/types';
import { getEntryData } from '@/lib/utils';
import React from 'react';

const EntryPage = async ({params}: {params: Promise<{entryId: string}>}) => {

  const {entryId} = await params;
  const entryData = await getEntryData(entryId);

  const unfinishedEntryPositions = entryData.positions.filter((position: EntryPositionType) => {
    return !position.isFinished
  })

  const finishedEntryPositions = entryData.positions.filter((position: EntryPositionType) => {
    return position.isFinished
  })

  const unfinishedEntryPositionsArr = unfinishedEntryPositions && unfinishedEntryPositions.map((position: EntryPositionType) => {
    return (
      <EntryPosition key={position._id} entryPosition={position} entryId={entryId} />
    )
  })

  const finishedEntryPositionsArr = finishedEntryPositions && finishedEntryPositions.map((position: EntryPositionType) => {
    return (
      <EntryPosition key={position._id} entryPosition={position} entryId={entryId} />
    )
  })

  return (
    <div className='content__container'>
      <EntryMenu entry={entryData}/>
      {/* <EntryCommentForm entryId={entryId} /> */}
      {unfinishedEntryPositionsArr}
      {finishedEntryPositions.length > 0 && 
        <div>
          <h3>Finished</h3>
          {finishedEntryPositionsArr}
        </div>
      }

      
    </div>
  )
}

export default EntryPage