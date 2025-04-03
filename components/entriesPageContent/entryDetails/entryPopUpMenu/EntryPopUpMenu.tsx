'use client'
import { CiEdit } from 'react-icons/ci';
import { IoTrashOutline } from 'react-icons/io5';

const EntryPopUpMenu = ({isOn, toggleEdit}: {isOn: boolean; toggleEdit: () => void}) => {

  return (
    <div
      className={`absolute top-7 right-4 flex flex-row gap-4 items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl origin-top-right ${
        isOn ? "animate-grow-up" : "hidden"
      }`}
    >
      <CiEdit onClick={() => toggleEdit()}/>
      <IoTrashOutline />
    </div>
  );
}

export default EntryPopUpMenu