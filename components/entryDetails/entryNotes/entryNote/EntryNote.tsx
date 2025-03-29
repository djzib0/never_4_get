'use client'
import { updateEntryComment } from '@/lib/actions';
import { EntryCommentType } from '@/lib/types';
import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { IoTrashOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

const EntryNote = ({entryId, comment}: {entryId: string; comment: EntryCommentType}) => {

  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  // const [initialComment, setInitialComment] = useState<string>(comment.comment);
  const [formData, setFormData] = useState({
    editedComment: comment.comment,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value, } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const toggleEdit = (bool?: boolean) => {
    console.log(bool)
    if (bool != undefined) {
      setIsEditOn(bool);
      setFormData(prevState => {
        return {
          ...prevState,
          editedComment: comment.comment
        }
      })
    } else {
      console.log("surprise mf")
      setIsEditOn(prevState => !prevState);
    }
  }

  const handleCommentUpdate = (commentId: string, newComment: string) => {
    updateEntryComment(commentId, newComment);
    toggleEdit(false);
  }
  
  return (
    <article className='w-1/1 flex flex-row justify-between gap-4 mx-4 my-2 text-gray-900'>
     
      {isEditOn ?
        <textarea 
          className='flex w-full text-start pl-2 bg-yellow-100 rounded-md outline-none'
          name='editedComment'
          value={formData.editedComment}
          onChange={handleChange}
        />
        :
        <div className='flex w-full text-start pl-2 bg-gray-100 rounded-md'>
          {comment.comment}
        </div>
      }

      <div className='flex flex-row gap-4 w-[100px] items-center text-3xl text-gray-600 '>
        
        {comment.comment === formData.editedComment ?
          <CiEdit 
          className='text-3xl border border-gray-600 rounded-md'
          onClick={() => toggleEdit()}
          />
          :
          <AiOutlineCheck 
            className='text-3xl border border-gray-600 rounded-md'
            onClick={() => handleCommentUpdate(comment._id, formData.editedComment)}
          />
        }

        { comment.comment === formData.editedComment ?
          <IoTrashOutline className='text-3xl border border-gray-600 rounded-md' />
          :
          <MdClose className='text-3xl border border-gray-600 rounded-md' onClick={() => toggleEdit(false)}/>
        }

      </div>
    </article>
  )
}

export default EntryNote