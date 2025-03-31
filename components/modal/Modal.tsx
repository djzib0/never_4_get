import React from 'react';
import Button from '../button/Button';

const Modal = ({title, handleFunc, closeFunc}: {title: string; handleFunc: () => void; closeFunc: () => void}) => {
  
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40'>
      <div className='flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-[90%] max-w-md relative'>
      <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={closeFunc}
        >
          ✖
        </button>
        <p className='font-semibold'>
          {title}
        </p>
        <div className='flex flex-row justify-center gap-4 w-full'>

          <Button 
            title='Yes'
            btnHtmlType='button'
            btnVariant='negative'
            btnHeight='small'
            btnWidth='normal'
            iconType='alert'
            handleClick={handleFunc}
          />

          <Button 
            title='Cancel'
            btnHtmlType='button'
            btnVariant='cancel'
            btnHeight='small'
            btnWidth='normal'
            handleClick={closeFunc}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal