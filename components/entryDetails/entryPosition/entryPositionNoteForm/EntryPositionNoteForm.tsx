'use client'
import React, { useEffect, useState } from 'react';
import Button from '../../../button/Button';
import TextCounter from '../../../textCounter/TextCounter';

const EntryPositionNoteForm = ({entryPositionId, note, closeForm}: {entryPositionId: string, note: string, closeForm: () => void}) => {

  const [formData, setFormData] = useState({note});
  const [buttonTitle, setButtonTitle] = useState("");
  
  useEffect(() => {
    if (formData.note.length > 0 ) {
      setButtonTitle("Update")
    } else {
      setButtonTitle("Add")
    }
  }, [formData.note])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const {name, value, type} = e.target
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
        }
      })
  }

  const handleSubmit = () => {
    console.log("submitting", entryPositionId)

  }
  
  return (
    <form className='fixed bottom-20 flex flex-col gap-2'>
      <label htmlFor='note' className='form__label'>Add note</label>
      <textarea
        className='form__input !h-20 !border-none'
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
          title={buttonTitle} 
          btnVariant='positive'
          btnHeight='medium'
          btnWidth='half'
          handleClick={() => handleSubmit()}
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
  )
}

export default EntryPositionNoteForm