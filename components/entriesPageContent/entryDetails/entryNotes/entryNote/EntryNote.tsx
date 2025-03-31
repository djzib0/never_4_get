'use client'
import Modal from '@/components/modal/Modal';
import { deleteEntryComment, editEntryComment } from '@/lib/actions';
import { EntryCommentType } from '@/lib/types';
import useMsgBox from '@/lib/utilComponents/useToastNotification';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { IoTrashOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

const EntryNote = ({entryId, comment}: {entryId: string; comment: EntryCommentType}) => {


  // use custom hook
  const {isToastNotificationOn, ToastNotification, setIsToastNotificationOn, toggleToastNotification} = useMsgBox();

  // state variables
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    editedComment: comment.comment,
  });

  // useRef hook
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // useEffect hook
  // set focus on the textarea field
  useEffect(() => {
    if (isEditOn) {
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [isEditOn]);

// update formData when the comment change
  useEffect(() => {
    setFormData(prevState => {
      return {
        ...prevState,
        editedComment: comment.comment
      }
    })
  }, [comment.comment])

  // using modal
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const toggleModal = (bool: boolean, title: string) => {
    setModalTitle(title);
    setIsModalOn(bool);
  }

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

    if (bool !== undefined) {
      setIsEditOn(bool);
      setFormData(prevState => {
        return {
          ...prevState,
          editedComment: comment.comment
        }
      })

      if (bool) {
        setTimeout(() => {
          if (textareaRef.current) textareaRef.current.focus()
        }, 0)
      }
    } else {
      setIsEditOn(prevState => !prevState);
    }
  }

  const handleCommentUpdate = async (commentId: string, newComment: string) => {
    const response = await editEntryComment(commentId, newComment);
    console.log(newComment)
    if (response.success) {
      setFormData(prevState => {
        return {
          ...prevState,
          comment: newComment
        }
      })
      toggleEdit(false);
      toggleToastNotification('info', 'Comment updated')
      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    } else {
      toggleToastNotification('error', "Failed to edit comment")
      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    }
  }
  
  const handleCommentDelete = async (commentId: string, entryId: string) => {
    const response = await deleteEntryComment(commentId, entryId)

    if (response.success) {
      toggleToastNotification('alert', 'Comment deleted');
      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    } else {
      toggleToastNotification('error', 'Failed to delete comment');
      setTimeout(() => {
        setIsToastNotificationOn(false);
      }, 2000);
    }
  }
  
  return (
    <article className='w-1/1 flex flex-row justify-between gap-4 mx-4 my-2 text-gray-900 !z-10'>
      {isToastNotificationOn && <ToastNotification />}
     
      {isEditOn ?
        <textarea 
          className='flex w-full text-start pl-2 min-h-4 max-h-full bg-yellow-100 rounded-md outline-none resize-none focus:border focus:border-gray-400'
          name='editedComment'
          value={formData.editedComment}
          onChange={handleChange}
          ref={textareaRef}
        />
        :
        <div className='flex w-full text-start pl-2 bg-gray-100 rounded-md'>
          {comment.comment}
        </div>
      }

      <div className='flex flex-row gap-4 w-[100px] items-center text-3xl text-gray-600'>
        
        {!isEditOn ?
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

        {!isEditOn ?
          <IoTrashOutline 
            className='text-3xl border border-gray-600 rounded-md'
            onClick={() => toggleModal(true, "Do you want to delete this comment?")}
          />
          :
          <MdClose className='text-3xl border border-gray-600 rounded-md' onClick={() => toggleEdit(false)}/>
        }

      </div>
      {isModalOn && <Modal 
        title={modalTitle} 
        handleFunc={() => handleCommentDelete(comment._id, entryId)}
        closeFunc={() => setIsModalOn(false)}
      />}
    </article>
  )
}

export default EntryNote