'use client'
import React, { useState } from 'react';
import Button from '../../../button/Button';
import TextCounter from '../../../textCounter/TextCounter';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { addPositionNote } from '@/lib/actions';

const EntryPositionNoteForm = ({entryPositionId, note, closeForm}: {entryPositionId: string, note: string, closeForm: () => void}) => {

  const [formData, setFormData] = useState({note});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const {name, value, type} = e.target
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
        }
      })
  }

  const handleSubmit = (entryPositionId: string, note: string, newNote: string) => {
    
    if (note.length !== 0 && note !== newNote) {
      addPositionNote(entryPositionId, newNote);
      closeForm();
    } else if (note !== newNote) {
      addPositionNote(entryPositionId, newNote);
      closeForm();
    } else {
      closeForm();
    }
  }
  
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/20 z-10">
      <div className="relative bg-white py-4 rounded-lg shadow-lg w-4/5 max-h-[50vh] overflow-y-auto text-center scroll-m-0">

        <button 
          onClick={() => closeForm()}
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-black"
        >
          <IoMdCloseCircleOutline className="w-7 h-7" />
        </button>

        <h2 className="text-xl font-semibold dark:text-black">Add note</h2>

        <form className='w-1/1 flex flex-col justify-between gap-4 mx-4 my-2 text-gray-900 !z-10'>
          <textarea
            className='flex w-full h-32 text-start text-base pl-2 rounded-md outline-none resize-none border border-gray-400'
            name="note"
            placeholder="Enter new note"
            onChange={handleChange}
            value={formData.note}
            maxLength={200}
            />
          <TextCounter current={formData.note.length} max={200} />
          <div className='flex flex-row gap-2'>
            <Button 
              btnHtmlType='button' 
              title='confirm' 
              btnVariant='positive'
              btnHeight='medium'
              btnWidth='half'
              handleClick={() => handleSubmit(entryPositionId, note, formData.note)}
              />
            <Button 
              btnHtmlType='button'
              title='Cancel' 
              btnVariant='cancel'
              btnHeight='medium'
              btnWidth='half'
              handleClick={() => closeForm()}
              />
          </div>
        </form>

      </div>
    </section>
  )
}

export default EntryPositionNoteForm