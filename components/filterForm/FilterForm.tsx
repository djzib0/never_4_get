import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';

const FilterForm = ({handleInputChange}: {handleInputChange: (value: string) => void}) => {

  const [isFilterOn, setIsFilterOn] = useState(false);

  const toggleFilter = () => {
    setIsFilterOn(prevState => !prevState)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {value} = e.target
    handleInputChange(value)
  }

  return (
    <div className='flex flex-row items-center'>
      <button
        onClick={toggleFilter}
        className='flex flex-row items-center gap-4 bg-yellow-300 text-black h-10 px-2 py-1 border border-[#A4B465] focus:outline-none rounded-tl-sm rounded-bl-sm'
      >
        Search<IoSearchOutline className='text-xl' />
      </button>
      <form className='w-full'>
        <input
          type="text"
          name='entryName'
          onChange={handleFilterChange}
          className={`border-r border-b border-t border-[#A4B465] h-10 px-2 transition-all duration-300 ease-in-out rounded-tr-sm rounded-br-sm focus:outline-none ${
            isFilterOn ? "w-full" : "w-0 !px-0 border-none"
          }`}
          placeholder={isFilterOn ? "Type here..." : ""}
        />
      </form>
    </div>         
  )
}

export default FilterForm