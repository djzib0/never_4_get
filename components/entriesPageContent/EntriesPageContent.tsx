'use client'
import { EntryType } from '@/lib/types';
import React, { useState } from 'react'
import EntryElement from './entryElement/EntryElement';
import FilterForm from '../filterForm/FilterForm';

const EntriesPageContent = ({entries}: {entries: EntryType[]}) => {
  // state variables
  const [filterData, setFilterData] = useState("");

  const onInputChange = (value: string) => {
    setFilterData(value)
  }

  // filter entries based on the filter form input
  const filteredEntries = entries && entries.filter((entry: EntryType) => {
    return entry.title.toLowerCase().includes(filterData.toLowerCase())
  })

  // map through filtered entries to display links to entry details
  const entriesLinksArr = filteredEntries && filteredEntries.map((entry: EntryType) => {
  return (
    <EntryElement
      key={entry._id}
      id={entry._id}
      title={entry.title}
      isActive={entry.isActive}
      isFavorite={entry.isFavorite}
      positionsNumber={entry.positions.length}
      commentsNumber={entry.comments.length}
    />
    )
  })

  return (
    <div className='flex flex-col gap-2'>
      <FilterForm handleInputChange={onInputChange} />
      {entriesLinksArr}
    </div>
  )
}

export default EntriesPageContent