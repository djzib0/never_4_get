'use client'
import { addEntryPosition } from '@/lib/actions'
import React, { useActionState, useState } from 'react'
import Button from '../button/Button'

const EntryPositionForm = ({entryId} : {entryId: string}) => {

  const [state, formAction] = useActionState(addEntryPosition, null)

  // handling hidden data which will not be provided by user
    const [hiddenFormData, setHiddenFormData] = useState({
      entryId
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value, type} = e.target
    setHiddenFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
      }
    })
  }

  return (
    <>
      <form className='form__container' action={formAction}>

        <label htmlFor='title' className='form__label'>Position title</label>
        <input
          className='form__input'
          type='text'
          name='title'
          required
        />

        <input
          type='text'
          name='entryId'
          value={hiddenFormData.entryId}
          onChange={handleChange}
          hidden
        />

        <Button title='Add position' btnHtmlType='submit' btnWidth='full' btnHeight='medium' btnVariant='positive' />
        {state?.error && <p>{state.error}</p>}
      </form>
    </>
  )
}

export default EntryPositionForm