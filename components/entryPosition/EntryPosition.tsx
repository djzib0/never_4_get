'use client'
import { EntryPositionType } from '@/lib/types'
import React, { useState } from 'react'
import EntryPositionNoteForm from '../entryPositionNoteForm/EntryPositionNoteForm'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaRegCircle } from 'react-icons/fa6'
import { RiStickyNoteAddLine } from 'react-icons/ri'

const EntryPosition = ({entryPosition}: {entryPosition: EntryPositionType}) => {
 
  const [isEntryPositionNoteFormOn, setIsEntryPositionNoteFormOn] = useState(false);

  const toggleNotes = () => {
    setIsEntryPositionNoteFormOn(prevState => !prevState);
  }

  return (
    <div className='flex justify-between items-center my-4'>
      <p className='w-4/5 bg-red-300 px-2 font-medium tracking-wider rounded-sm'>
        {entryPosition && entryPosition.title}
      </p>
      
      <div className='flex flex-row gap-4 items-center'>
        <RiStickyNoteAddLine
          onClick={toggleNotes}
        />
        {entryPosition.isFinished ? 
        <FaRegCheckCircle
          className='text-2xl mr-4'
        /> 
        : 
        <FaRegCircle 
          className='text-2xl mr-4'
          
        />
        }
      </div>

      {isEntryPositionNoteFormOn && 
      <EntryPositionNoteForm
        entryPositionId={entryPosition._id}
        note={entryPosition.note || ""}
        closeForm={() => setIsEntryPositionNoteFormOn(false)}
      />}
    </div>
  )
}

export default EntryPosition