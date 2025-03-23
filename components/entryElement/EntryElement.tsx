import { capitalizeFirstLetter } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { TbListNumbers } from 'react-icons/tb';




type EntryElementType = {
  id?: string;
  title: string;
  isActive: boolean;
  isFavorite: boolean;
  positionsNumber: number;
  commentsNumber: number;
}

const EntryElement = ({id, title, isActive, isFavorite, positionsNumber, commentsNumber} : EntryElementType) => {
  
  return (
    <Link 
      key={id} 
      href={`/entries/${id}`}
      className='flex flex-row justify-between items-center text-[#626F47] dark:text-[#3C3D37] text-lg font-medium bg-white p-4 rounded-sm drop-shadow-sm'
    >
      <div className='w-3/4'>
        <p className='tracking-tight text-base'>{capitalizeFirstLetter(title)}</p>
      </div>
      <div className='flex flex-row items-center text-2xl gap-4'>
        <p>{isActive ? <IoMdCheckmarkCircleOutline className='!text-[#007AFF]' /> :  <IoMdCloseCircleOutline className='!text-[#B0B0B0]' />}</p>
        <p>{isFavorite ? <MdFavorite className='!text-red-600' /> : <MdFavoriteBorder className='!text-red-300' />}</p>
        <div className='relative'>
          <TbListNumbers />
          <div className='absolute top-3 left-4 bg-[#FFCF50] text-slate-800 !text-sm font-normal rounded-full py-0 px-1'>
            {positionsNumber}
          </div>
        </div>
        <div className='relative'>
          <BiSolidCommentDetail />
          <div className='absolute top-3 left-4 bg-[#FFCF50] text-slate-800 !text-sm font-normal rounded-full py-0 px-1'>{commentsNumber}</div>
        </div>
      </div>
    </Link>
  )
}

export default EntryElement