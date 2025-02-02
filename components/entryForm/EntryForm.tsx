'use client'
import { addEntry, addPositionToEntry } from '@/lib/actions'
import React, { useActionState, useState } from 'react'

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
      <button onClick={addPositionToEntry}>Add new position</button>
    </>
  )
}

export default EntryForm