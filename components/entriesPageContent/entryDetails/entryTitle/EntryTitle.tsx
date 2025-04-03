'use client' 
import React, { useEffect, useRef, useState } from 'react';
import { PiDotsThreeCircle } from 'react-icons/pi';
import EntryPopUpMenu from '../entryPopUpMenu/EntryPopUpMenu';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { updateEntryTitle } from '@/lib/actions';

const EntryTitle = ({entryTitle}: {entryTitle: string}) => {

  // state variables
  const [isPopUpMenuOn, setIsPopUpMenuOn] = useState<boolean>(false);
  const [isEditTitleOn, setIsEditTitleOn] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    entryTitle: entryTitle
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
    if (formData.entryTitle !== entryTitle) {
      setFormData(prevState => {
        return {
          ...prevState,
          entryTitle: entryTitle
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

  // set states to false after first render
  useEffect(() => {
    setIsEditTitleOn(false)
    setIsPopUpMenuOn(false);
  }, [])

  return (
    <div className='relative flex flex-row justify-between items-center mb-4 text-[#697565] text-3xl uppercase font-semibold'>
      {isEditTitleOn ?
        <div>
          <input 
            placeholder='Entry title'
            name='entryTitle'
            value={formData.entryTitle}
            type='text'
            onChange={handleChange}
            ref={textRef}
          />
        </div>
        :
        <h1>{entryTitle}</h1>
      }

      {isEditTitleOn ?
        <div className='flex flex-row justify-center items-center'>
          {entryTitle !== formData.entryTitle && <AiOutlineCheck onClick={() => updateEntryTitle(formData.entryTitle)} />}
          <IoMdCloseCircleOutline onClick={cancelEditTitle}/>
        </div>
        :
        <PiDotsThreeCircle onClick={togglePopUpMenu} />
      }

      {isPopUpMenuOn && <EntryPopUpMenu isOn={isPopUpMenuOn} toggleEdit={toggleEditTitle} />}

    </div>
  )
}

export default EntryTitle