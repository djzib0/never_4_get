'use client' 
import React, { useEffect, useRef, useState } from 'react';
import { PiDotsThreeCircle } from 'react-icons/pi';
import EntryPopUpMenu from '../entryPopUpMenu/EntryPopUpMenu';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { EntryType } from '@/lib/types';
import { updateEntry } from '@/lib/actions';

const EntryTitle = ({entry}: { entry: EntryType}) => {

  // state variables
  const [isPopUpMenuOn, setIsPopUpMenuOn] = useState<boolean>(false);
  const [isEditTitleOn, setIsEditTitleOn] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    entryTitle: entry.title
  })

  // useRef hook
  const textRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditTitleOn) {
      setTimeout(() => textRef.current?.focus(), 0);
    }
  }, [isEditTitleOn])
  

  const togglePopUpMenu = () => {
    setIsPopUpMenuOn(prevState => !prevState)
  }

  const toggleEditTitle = () => {
    setIsEditTitleOn(prevState => !prevState)
    setIsPopUpMenuOn(false);
    
  }

  const cancelEditTitle = () => {
    setIsEditTitleOn(false);
    if (formData.entryTitle !== entry.title) {
      setFormData(prevState => {
        return {
          ...prevState,
          entryTitle: entry.title
        }
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value, type} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
      }
    })
  }

  const handleTitleUpdate = (newEntry: EntryType) => {
    updateEntry(newEntry);
    setIsEditTitleOn(false);
  }


  // set states to false after first render
  useEffect(() => {
    setIsEditTitleOn(false)
    setIsPopUpMenuOn(false);
  }, [])

  return (
    <div className='relative flex flex-row gap-4 justify-between items-center mb-4 text-[#626F47] dark:text-[#DCD7C9] text-3xl font-semibold'>
      {isEditTitleOn ?
        <input 
          placeholder='Entry title'
          name='entryTitle'
          value={formData.entryTitle}
          type='text'
          onChange={handleChange}
          ref={textRef}
          className='w-full px-2 rounded-md outline-none resize-none border border-gray-400'
        />
        :
        <h1>{entry.title}</h1>
      }

      {isEditTitleOn ?
        <div className='flex flex-row justify-center items-center border border-transparent'>
          {entry.title !== formData.entryTitle && <AiOutlineCheck onClick={() => handleTitleUpdate({...entry, title: formData.entryTitle})} />}
          <IoMdCloseCircleOutline onClick={cancelEditTitle}/>
        </div>
        :
        <PiDotsThreeCircle onClick={togglePopUpMenu} />
      }

      {isPopUpMenuOn && <EntryPopUpMenu isOn={isPopUpMenuOn} toggleEdit={toggleEditTitle} entryId={entry._id} />}

    </div>
  )
}

export default EntryTitle