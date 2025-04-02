'use client' 
import React, { useState } from 'react';
import { PiDotsThreeCircle } from 'react-icons/pi';
import EntryPopUpMenu from '../entryPopUpMenu/EntryPopUpMenu';

const EntryTitle = ({entryTitle}: {entryTitle: string}) => {

  // state variables
  const [isPopUpMenuOn, setIsPopUpMenuOn] = useState<boolean>(true);

  const togglePopUpMenu = () => {
    setIsPopUpMenuOn(prevState => !prevState)
  }

  return (
    <div className='relative flex flex-row justify-between items-center mb-4 text-[#697565] text-3xl uppercase font-semibold'>
      <h1>{entryTitle}</h1>
      <PiDotsThreeCircle onClick={togglePopUpMenu} />
      {isPopUpMenuOn && <EntryPopUpMenu isOn={isPopUpMenuOn} />}
    </div>
  )
}

export default EntryTitle