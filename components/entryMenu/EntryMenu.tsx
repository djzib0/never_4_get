'use client'
import { updateEntry } from '@/lib/actions';
import { EntryType } from '@/lib/types';
import React, { useState } from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const EntryMenu = ({entry} : {entry: EntryType}) => {

  const [isCommentsComponentOn, setIsCommentsComponentOn] = useState(false);

  const toggleCommentsComponentOn = () => {
    setIsCommentsComponentOn(prevState => !prevState);
  }

  return (
    <div>
      <div className='w-full flex flex-row justify-start gap-4 mb-4 text-[#626F47] dark:text-[#3C3D37]'>

        <button 
          className='flex flex-row items-center w-[150px] text-xs font-medium bg-white shadow-md px-2 py-1 rounded-md'
          onClick={() => updateEntry({...entry, isActive: !entry.isActive})}
        >
          {entry.isActive ? <IoMdCheckmarkCircleOutline className='!text-[#007AFF] text-xl' /> :  <IoMdCloseCircleOutline className='!text-[#B0B0B0] text-xl' />} 
          <p className='ml-2'>{entry.isActive ? "Entry active" : "Entry not active"}</p>
        </button>

        <button 
          className='flex flex-row items-center w-[160px] text-xs font-medium bg-white shadow-md px-2 py-1 rounded-md'
          onClick={() => updateEntry({...entry, isFavourite: !entry.isFavourite})}
        >
          {entry.isFavourite ? <MdFavorite className='!text-red-600 text-xl' /> : <MdFavoriteBorder className='!text-red-300 text-xl' />} 
          <p className='ml-2'>Add to favourites</p>
        </button>

        <button 
          className='flex flex-row items-center w-[150px] text-xs font-medium bg-white shadow-md px-2 py-1 rounded-md'
          onClick={toggleCommentsComponentOn}
        >
          <BiSolidCommentDetail className='text-xl'/>
          <p className='ml-2'>Show notes</p>
        </button>
      </div>
      
      {isCommentsComponentOn && <p>Here will be a component with comments</p>}
    </div>
  )
}

export default EntryMenu