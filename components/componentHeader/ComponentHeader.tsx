import React from 'react'

const ComponentHeader = ({title}: {title: string}) => {
  return (
    <h1 className='text-xl font-semibold text-[#626F47] dark:text-[#DCD7C9]'>
      {title}
    </h1>
  )
}

export default ComponentHeader