import React from 'react';
import EntryMenu from './entryMenu/EntryMenu';
import { EntryPositionType, EntryType } from '@/lib/types';
import EntryPosition from './entryPosition/EntryPosition';

const EntryDetails = ({entryData, entryId}: {entryData: EntryType; entryId: string}) => {

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
      <h1 className='text-[#697565] text-3xl mb-4 uppercase font-semibold'>{entryData.title}</h1>
      <EntryMenu entry={entryData}/>
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

export default EntryDetails