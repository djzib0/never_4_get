import React, { useState } from 'react';

const useMsgBox = () => {
  
  const [isToastNotificationOn, setIsToastNotificationOn] = useState<boolean>(false);
  const [toastNotificationText, setToastNotificationText] = useState("")

  const toggleToastNotification = (msgText: string) => {
    setToastNotificationText(msgText)
    setIsToastNotificationOn(true)
    setTimeout(() => {
      setIsToastNotificationOn(false)
      setToastNotificationText("")
    }, 2000);
  }

  const ToastNotification = () => {
    return (
      <p 
      // className='fixed bottom-[100px] left-1/2 -translate-x-1/2 flex justify-center items-center w-[250px] h-[50px] p-0 m-0 bg-[rgba(57,57,57,0.95)] border border-[rgb(143,143,143)] z-200 animate-show-hide backdrop-blur-md'>
      className='fixed bottom-[100px] flex justify-center items-center w-[250px] h-[50px] p-0 m-0 bg-yellow-300/60 border border-yellow-700 text-black font-semibold uppercase animate-show-hide backdrop-blur-md shadow-lg rounded-lg'>
      {toastNotificationText}
  </p>

    )
  }


  return {isToastNotificationOn, ToastNotification, setIsToastNotificationOn, toggleToastNotification}

}

export default useMsgBox