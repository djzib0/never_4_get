'use client'
import { addEntryPosition } from '@/lib/actions'
import React, { useActionState, useState } from 'react'

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
      <form action={formAction}>

        <label htmlFor='title'>Entry title</label>
        <input
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

        <button>Add new position</button>
        {state?.error && <p>{state.error}</p>}
      </form>
    </>
  )
}

export default EntryPositionForm