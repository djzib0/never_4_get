import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';
import { TfiInfoAlt } from 'react-icons/tfi';

type toastNotificationType = {
  text: string;
  type: "success" | "error" | "alert" | "info" | undefined;
  headerText: string
}

const useMsgBox = () => {
  
  const [isToastNotificationOn, setIsToastNotificationOn] = useState<boolean>(false);
  const [toastNotificationBody, setToastNotificationBody] = useState<toastNotificationType>({
    text: "",
    type: undefined,
    headerText: ""
  })

  useEffect(() => {
    switch (toastNotificationBody.type) {
      case "success":
        setToastNotificationBody(prevState => {
          return ({...prevState, headerText: "Succes!!"})
        });
        break;
      case "alert":
        setToastNotificationBody(prevState => {
          return ({...prevState, headerText: "Alert!"})
        });
        break;
      case "info":
        setToastNotificationBody(prevState => {
          return ({...prevState, headerText: "Information!"})
        });
        break;
      case "error":
        setToastNotificationBody(prevState => {
          return ({...prevState, headerText: "Oops!"})
        });
        break;
    }
  }, [toastNotificationBody.type])

  const toggleToastNotification = (
      notificationType: "success" | "alert" | "info" | "error" | undefined, 
      notificationText: string
    ) => {

    setIsToastNotificationOn(false)

    setToastNotificationBody({
      ...toastNotificationBody,
      text: notificationText,
      type: notificationType
    })
    setIsToastNotificationOn(true)
    setTimeout(() => {
      setIsToastNotificationOn(false)
      setToastNotificationBody({
        text: "",
        type: undefined,
        headerText: ""
      })
    }, 2000);
  }



  const ToastNotification = () => {
    return (
      <div className='fixed left-1/2 -translate-x-1/2 bottom-[100px] flex justify-between items-center w-[320px] h-[75px] p-0 m-0 text-black shadow-md border border-gray-400 z-50 animate-show-hide'>
        {toastNotificationBody.type === "success" && <div className='flex flex-col justify-center items-center w-1/5 h-full bg-[#00ab3a]'>
          <AiOutlineCheck className='text-3xl text-white' />
        </div>}
        {toastNotificationBody.type === "info" && <div className='flex flex-col justify-center items-center w-1/5 h-full bg-[#0080c2]'>
          <TfiInfoAlt className='text-3xl text-white' />
        </div>}
        {toastNotificationBody.type === "alert" && <div className='flex flex-col justify-center items-center w-1/5 h-full bg-[#ffb000]'>
          <GoAlert className='text-3xl text-black' />
        </div>}
        {toastNotificationBody.type === "error" && <div className='flex flex-col justify-center items-center w-1/5 h-full bg-[#f70013]'>
          <AiOutlineCloseCircle  className='text-3xl text-white' />
        </div>}

        <div className='flex flex-col flex-1 justify-center items-start w-4/5 h-full p-2 bg-white'>
          <p className='text-base leading-7 tracking-wider font-semibold'>{toastNotificationBody.headerText}</p>
          <p className='text-base leading-7 tracking-wider font-light'>{toastNotificationBody.text}</p>
        </div>
      </div>
    )
  }


  return {isToastNotificationOn, ToastNotification, setIsToastNotificationOn, toggleToastNotification}

}

export default useMsgBox