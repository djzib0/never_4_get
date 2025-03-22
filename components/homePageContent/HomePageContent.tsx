'use client'
import { EntryType } from '@/lib/types'
import React, { useState } from 'react'
import EntryElement from '../entryElement/EntryElement';

const HomePageContent = ({entries}: {entries: EntryType[]}) => {

  // state variables
  const [filterData, setFilterData] = useState({
    entryName: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target
  
    setFilterData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  console.log(filterData)

  // filter entries based on the filter form input
  const filteredEntries = entries.length > 0 && entries.filter((entry: EntryType) => {
    return entry.title.toLowerCase().includes(filterData.entryName.toLowerCase())
  })

  // map through filtered entries to display links to entry details
  const entriesLinksArr = filteredEntries && filteredEntries.map((entry: EntryType) => {
  return (
    <EntryElement
      key={entry._id}
      id={entry._id}
      title={entry.title}
      isActive={entry.isActive}
      isFavourite={entry.isFavourite}
      positionsNumber={entry.positions.length}
      commentsNumber={entry.comments.length}
    />
  )
})

  return (
    <div className='flex flex-col gap-2'>
      <form>
        <input 
          type='text' 
          name='entryName' 
          value={filterData.entryName} 
          onChange={handleFilterChange}
        />
      </form>
      {entriesLinksArr}
    </div>
  )
}

export default HomePageContent