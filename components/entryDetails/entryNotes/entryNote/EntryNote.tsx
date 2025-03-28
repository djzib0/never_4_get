'use client'
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { IoTrashOutline } from 'react-icons/io5';

const EntryNote = ({entryId, comment}: {entryId: string; comment: string}) => {

  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [initialComment, setInitialComment] = useState<string>(comment);
  const [formData, setFormData] = useState({
    editedComment: comment,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value, } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const toggleEdit = () => {
    setIsEditOn(prevState => !prevState);
  }
  
  return (
    <article className='w-1/1 flex flex-row justify-between gap-4 mx-4 py-4 text-gray-900'>
      {isEditOn ?
        <input className='flex w-full items-start text-start pl-2 bg-gray-100 rounded-md outline-none'
          name='editedComment'
          value={formData.editedComment}
          onChange={handleChange}
        />
        :
        <div className='flex w-full items-start text-start pl-2 bg-gray-100 rounded-md'>
          {comment}
        </div>
      }

      <div className='flex flex-row gap-2 w-[100px] items-center text-3xl text-gray-600 '>
        <CiEdit 
          className='text-4xl border border-gray-600 rounded-md'
          onClick={toggleEdit}
        />
        <IoTrashOutline className='text-4xl border border-gray-600 rounded-md' />
      </div>
    </article>
  )
}

export default EntryNote