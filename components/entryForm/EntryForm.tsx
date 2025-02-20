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
      <div className='flex flex-col'>
        <Button title='Test Button' size='small' type='confirm' color='bg-[#A594F9]'/>
        <Button title='Test Button' size='medium' type='edit' color='bg-[#E0E5B6]'/>
        <Button title='Test Button' size='large' type='cancel' color='bg-[#E1EACD]'/>
        <Button title='Test Button' size='full' type='cancel' color='bg-[#A594F9]'/>
      </div>
    </>
  )
}

export default EntryForm