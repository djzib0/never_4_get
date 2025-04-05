'use client'
import Modal from '@/components/modal/Modal';
import { deleteEntry } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoTrashOutline } from 'react-icons/io5';

const EntryPopUpMenu = ({isOn, toggleEdit, entryId}: {isOn: boolean; toggleEdit: () => void; entryId: string}) => {

  // using modal
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const toggleModal = (bool: boolean, title: string) => {
    setModalTitle(title);
    setIsModalOn(bool);
  }

  const handleEntryDelete = () => {
    deleteEntry(entryId)
    redirect("/entries")
  }

  return (
    <div
      className={`absolute top-7 right-4 flex flex-row gap-4 items-center justify-center bg-white border border-gray-500 p-4 rounded-lg shadow-2xl origin-top-right ${
        isOn ? "animate-grow-up" : "hidden"
      }`}
    >
      <CiEdit onClick={() => toggleEdit()}/>
      <IoTrashOutline onClick={() => toggleModal(true, "Do you want to delete this entry?")} />

      {isModalOn && 
        <Modal 
          title={modalTitle} 
          handleFunc={() => handleEntryDelete()}
          closeFunc={() => setIsModalOn(false)}
        />
      }

    </div>
  );
}

export default EntryPopUpMenu