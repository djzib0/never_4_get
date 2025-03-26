'use client'
import { addEntryComment } from '@/lib/actions'
import React, { useActionState, useState } from 'react'

const EntryCommentForm = ({entryId} : {entryId: string}) => {

  const [state, formAction] = useActionState(addEntryComment, null)
  
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
    <form action={formAction}>

        <label htmlFor='comment'>Comment</label>
        <input
          type='text'
          name='comment'
          max={3}
          required
        />

        <input
          type='text'
          name='entryId'
          value={hiddenFormData.entryId}
          onChange={handleChange}
          hidden
        />

        <button>Add comment</button>
        {state?.error && <p>{state.error}</p>}
      </form>
  )
}

export default EntryCommentForm