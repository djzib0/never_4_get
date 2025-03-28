import { EntryCommentType } from '@/lib/types';
import React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import EntryNote from './entryNote/EntryNote';


const EntryNotes = ({comments, handleClose, entryId}: {comments: EntryCommentType[] ;handleClose: () => void; entryId: string}) => {

  const commentsArr = comments.length > 0 && comments.map((comment) => {
    return <EntryNote key={comment._id} comment={comment} entryId={entryId}/>
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/20">
      <div className="relative bg-white py-4 rounded-lg shadow-lg w-4/5 max-h-[50vh] overflow-y-auto text-center scroll-m-0">

        <button 
          onClick={() => handleClose()}
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-black"
        >
          <IoMdCloseCircleOutline className="w-7 h-7" />
        </button>

        <h2 className="text-xl font-semibold dark:text-black">Centered Component</h2>
        <p className="text-gray-600">This blocks background interaction.</p>
        {commentsArr}
      </div>
    </div>
  )
}

export default EntryNotes