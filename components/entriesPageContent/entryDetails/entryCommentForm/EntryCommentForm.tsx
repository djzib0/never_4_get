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
    <form action={formAction} className='w-1/1 flex flex-row justify-between gap-4 mx-4 my-2 text-gray-900 !z-10'>
        <input
          className='flex w-full text-start pl-2 min-h-4 max-h-full rounded-md outline-none resize-none border border-gray-400'
          type='text'
          name='comment'
          max={3}
          required
          placeholder='Add new comment here...'
        />


        <input
          type='text'
          name='entryId'
          value={hiddenFormData.entryId}
          onChange={handleChange}
          hidden
        />

        <div className='flex flex-row gap-4 w-[100px] items-center justify-center text-gray-600'>
          <button className='w-full border border-gray-600 rounded-md uppercase'>Add</button>
        </div>

        {state?.error && <p>{state.error}</p>}
      </form>
  )
}

export default EntryCommentForm