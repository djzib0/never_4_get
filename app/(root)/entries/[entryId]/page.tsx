import EntryPosition from '@/components/entryPosition/EntryPosition';
import { EntryPositionType } from '@/lib/types';
import React from 'react';

const getEntryData = async (entryId: string) => {
  // fetch entry data by entry id
  const res = await fetch(`http://localhost:3000/api/entries/${entryId}`)

  if (!res.ok) {
    throw new Error("Couldn't not fetch entry data.")
  }

  return res.json();
}

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
      {entryPositionsArr}
    </div>
  )
}

export default EntryPage