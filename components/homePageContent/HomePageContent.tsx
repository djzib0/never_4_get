'use client'
import { EntryType } from '@/lib/types'
import React, { useState } from 'react'
import EntryElement from '../entriesPageContent/entryElement/EntryElement';
import FilterForm from '../filterForm/FilterForm';
import Link from 'next/link';

const HomePageContent = ({entries}: {entries: EntryType[]}) => {

  // state variables
  const [filterData, setFilterData] = useState("");

  if (entries.length === 0) {
    return (
      <div>
        You don&apos;t have any entries. Click{" "}
        <Link href={"/entries/add"} className='underline font-semibold'>here</Link>{" "}
        to add your first entry.
      </div>
    )
  }

  const onInputChange = (value: string) => {
    setFilterData(value)
  }

  // filter entries based on the filter form input
  const filteredEntries = entries.length > 0 && entries.filter((entry: EntryType) => {
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

export default HomePageContent