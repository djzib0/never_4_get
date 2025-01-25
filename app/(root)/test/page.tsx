import { addEntry, addUser } from '@/lib/actions'
import React from 'react'

const TestPage = () => {
  return (
    <div className='flex flex-col'>
      <button onClick={addEntry}>Add new entry mate</button>
      <button onClick={addUser}>Add new mate</button>
    </div>
  )
}

export default TestPage