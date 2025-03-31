'use client'
import { EntryCommentType } from '@/lib/types';
import React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import EntryNote from './entryNote/EntryNote';
import EntryCommentForm from '../entryCommentForm/EntryCommentForm';


const EntryNotes = ({comments, handleClose, entryId}: {comments: EntryCommentType[] ;handleClose: () => void; entryId: string}) => {

  const commentsArr = comments.length > 0 && comments.map((comment) => {
    return <EntryNote key={comment._id} comment={comment} entryId={entryId}/>
  })

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/20 z-10">
      <div className="relative bg-white py-4 rounded-lg shadow-lg w-4/5 max-h-[50vh] overflow-y-auto text-center scroll-m-0">

        <button 
          onClick={() => handleClose()}
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-black"
        >
          <IoMdCloseCircleOutline className="w-7 h-7" />
        </button>

        <h2 className="text-xl font-semibold dark:text-black">Comments</h2>
        <EntryCommentForm entryId={entryId} />
        {!commentsArr && 
        <>
        There are no comments.</>}
        {commentsArr}
      </div>
    </section>
  )
}

export default EntryNotes