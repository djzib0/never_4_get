'use client'
import { addEntry } from '@/lib/actions'
import React, { useActionState, useEffect, useState } from 'react'
import Button from '../button/Button'
import { redirect } from 'next/navigation'

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

  useEffect(() => {
    if (state?.success) {
      redirect("/entries")
    }
  }, [state])

  return (
    <>
      <form action={formAction} className='form__container'>
        <label htmlFor='title' className='form__label'>Entry title</label>
        <input
          className='form__input'
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
        <Button title='Add new entry' btnHtmlType='submit' btnWidth='full' btnHeight='medium' btnVariant='positive' />
        {state?.error && <p>{state.error}</p>}
      </form>
    </>
  )
}

export default EntryForm