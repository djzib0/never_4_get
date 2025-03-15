'use client'
import React from 'react'

const TextCounter = ({current, max}: {current: number, max: number}) => {



  return (
    <div className='flex justify-end text-xs font-medium'>
      {current}/{max}
    </div>
  )
}

export default TextCounter