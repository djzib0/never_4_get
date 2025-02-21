'use client'
import { addEntry } from '@/lib/actions'
import React, { useActionState, useState } from 'react'
import Button from '../button/Button'

const EntryForm = ({userId}: {userId: string}) => {

  const [state, formAction] = useActionState(addEntry, null)

  // handling hidden data which will not be provided by user
  const [hiddenFormData, setHiddenFormData] = useState({
    userId
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
      <form action={formAction}>

        <label htmlFor='title'>Entry title</label>
        <input
          type='text'
          name='title'
          required
        />

        <input
          type='text'
          name='userId'
          value={hiddenFormData.userId}
          onChange={handleChange}
          hidden
        />

        <button>Add new entry</button>
        {state?.error && <p>{state.error}</p>}
      </form>
      <button type='submit'>Add new position</button>
      <div className='flex flex-row gap-2 py-4'>
        <Button title='Test Button' btnWidth='narrow' btnHeight='small' btnType='negative' iconType='info' />
        <Button title='Test Button' btnWidth='wide' btnHeight='medium' btnType='positive' iconType='alert'  />
        <Button title='Test Button' btnWidth='full' btnHeight='large' btnType='positive' iconType='question' />
      </div>
    </>
  )
}

export default EntryForm