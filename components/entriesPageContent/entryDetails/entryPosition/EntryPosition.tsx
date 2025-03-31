'use client'
import { EntryPositionType } from '@/lib/types'
import React, { useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaRegCircle } from 'react-icons/fa6'
import { RiStickyNoteAddLine } from 'react-icons/ri'
import { IoTrashOutline } from 'react-icons/io5'
import { deleteEntryPosition, updateEntryPosition } from '@/lib/actions'
import Modal from '../../../modal/Modal'
import EntryPositionNoteForm from '../entryPositionNoteForm/EntryPositionNoteForm'

const EntryPosition = ({entryPosition, entryId}: {entryPosition: EntryPositionType, entryId: string}) => {
 
  // state variables
  const [isEntryPositionNoteFormOn, setIsEntryPositionNoteFormOn] = useState(false);

  // using modal
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalTitle, setModalTitle] = useState("")

  const toggleModal = (bool: boolean, title: string) => {
    setModalTitle(title);
    setIsModalOn(bool);
  }

  const toggleNotes = () => {
    setIsEntryPositionNoteFormOn(prevState => !prevState);
  }

  return (
    <div 
    className='before:bg-[#FFCF50] before:w-[10px] before:h-full flex justify-between
      items-center my-4 h-[40px] bg-white text-black dark:text-[#3C3D37]'>
      

      <p className='w-4/5 px-2 font-thin tracking-wider rounded-sm'>
        {entryPosition && entryPosition.title}
      </p>
      
      <div className='flex flex-row gap-4 items-center'>
          <div className='relative'>
            <RiStickyNoteAddLine
              className='text-2xl ml-2'
              onClick={toggleNotes}
            />
            {entryPosition.note && entryPosition.note.trim() !== "" && 
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border border-gray-600 rounded-full"></span>
            }
          </div>
        {entryPosition.isFinished ? 
        <FaRegCheckCircle
          className='text-2xl ml-2'
          onClick={() => updateEntryPosition({...entryPosition, isFinished: false})}
        /> 
        : 
        <FaRegCircle 
          className='text-2xl ml-2'
          onClick={() => updateEntryPosition({...entryPosition, isFinished: true})}
        />
        }
        <IoTrashOutline
          className='text-2xl ml-2'
          onClick={() => toggleModal(true, "Do you want to delete this position?")}
        />
      </div>


      {isEntryPositionNoteFormOn && 
      <EntryPositionNoteForm
        entryPositionId={entryPosition._id}
        note={entryPosition.note || ""}
        closeForm={() => setIsEntryPositionNoteFormOn(false)}
      />}

      {isModalOn && <Modal 
        title={modalTitle} 
        handleFunc={() => deleteEntryPosition(entryId, entryPosition._id)}
        closeFunc={() => setIsModalOn(false)}
      />}
    </div>
  )
}

export default EntryPosition