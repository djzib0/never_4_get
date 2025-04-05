'use client'
import { updateEntry } from '@/lib/actions';
import { EntryType } from '@/lib/types';
import React, { startTransition, useOptimistic, useState } from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { RiMenuAddFill } from 'react-icons/ri';
import EntryPositionForm from './entryPositionForm/EntryPositionForm';
import EntryNotes from '../entryNotes/EntryNotes';
import useToastNotification from '@/lib/utilComponents/useToastNotification';

const EntryMenu = ({entry} : {entry: EntryType}) => {

  const [optimisticEntry, updateOptimisticEntry] = useOptimistic(
        entry
  )

  // state variables
  const [isCommentsComponentOn, setIsCommentsComponentOn] = useState(false);
  const [isAddPositionFormOn, setIsAddPositionFormOn] = useState(false);

  // utilize custom hook useToastNotification
  const {isToastNotificationOn, ToastNotification, toggleToastNotification, setIsToastNotificationOn } = useToastNotification();

  const handleActiveUpdate = (entry: EntryType) => {
    startTransition(() => {
      updateOptimisticEntry(entry);
      if (entry.isActive === true) {
        toggleToastNotification("info", "Entry activated")
      } else if (entry.isActive === false) {
        toggleToastNotification("info", "Entry deactivated")
      }

      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    });
      
    updateEntry(entry);
  }

  const handleFavoriteUpdate = (entry: EntryType) => {
    startTransition(() => {
      updateOptimisticEntry(entry);
      if (entry.isFavorite === true) {
        toggleToastNotification("info", "Entry added to favorites")
      } else if (entry.isFavorite === false) {
        toggleToastNotification("info", "Entry removed from favorites" )
      }

      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    });
      
    updateEntry(entry);
  }

  const toggleCommentsComponentOn = () => {
    setIsAddPositionFormOn(false);
    setIsCommentsComponentOn(prevState => !prevState);
  }

  const togglePositionForm = () => {
    setIsCommentsComponentOn(false);
    setIsAddPositionFormOn(prevState => !prevState);
  }

  return (
    <div>
      {isToastNotificationOn && <ToastNotification />}
      <div className='w-full flex flex-row justify-start gap-4 mb-4 text-[#626F47] dark:text-[#3C3D37]'>
        <button 
          className={`flex flex-row items-center text-base w-1/2 font-medium bg-yellow-300 border-2 border-[#626F47] dark:border-[#FEFAE0] shadow-md px-2 py-2 rounded-md`}
          onClick={() => handleActiveUpdate({...entry, isActive: !entry.isActive})}
        >
          {optimisticEntry.isActive ? <IoMdCheckmarkCircleOutline className='!text-[#007AFF] text-2xl' /> :  <IoMdCloseCircleOutline className='!text-[#B0B0B0] text-2xl' />} 
          <p className='ml-2'>{optimisticEntry.isActive ? "Deactivate" : "Activate"}</p>
        </button>

        <button 
          className={`flex flex-row items-center text-base w-1/2 font-medium bg-yellow-300 border-2 border-[#626F47] dark:border-[#FEFAE0] shadow-md px-2 py-2 rounded-md`}
          onClick={() => handleFavoriteUpdate({...entry, isFavorite: !entry.isFavorite})}
        >
          {optimisticEntry.isFavorite ? <MdFavorite className='!text-red-600 text-2xl' /> : <MdFavoriteBorder className='!text-red-300 text-2xl' />} 
          <p className='ml-2'>{optimisticEntry.isFavorite ? "Remove from favourites" : "Add to favourites"}</p>
        </button>
      </div>


      <div className='w-full flex flex-row justify-start gap-4 mb-4 text-[#626F47] dark:text-[#3C3D37]'>
        <button 
            className={`flex flex-row items-center text-base w-1/2 font-medium border-2 ${isAddPositionFormOn ? `bg-slate-200`: `bg-white`} border-[#626F47] dark:border-[#626F47] shadow-md px-2 py-2 rounded-md`}
            onClick={togglePositionForm}
            >
            <RiMenuAddFill className='text-2xl'/>
            <p className='ml-2'>Add position</p>
          </button>
        <button 
            className={`flex flex-row items-center text-base w-1/2 font-medium border-2 ${isCommentsComponentOn ? `bg-slate-200`: `bg-white`} border-[#626F47] dark:border-[#626F47] shadow-md px-2 py-2 rounded-md`}
            onClick={toggleCommentsComponentOn}
            >
            <BiSolidCommentDetail className='text-2xl'/>
            <p className='ml-2'>Show entry notes</p>
          </button>
      </div>
      
      {isAddPositionFormOn && <EntryPositionForm entryId={entry._id} />}
      {isCommentsComponentOn && <EntryNotes entryId={entry._id} handleClose={toggleCommentsComponentOn} comments={entry.comments} />}
    </div>
  )
}

export default EntryMenu