import React from 'react'
import { BsFillExclamationCircleFill, BsFillInfoCircleFill, BsFillQuestionCircleFill } from 'react-icons/bs';

type ButtonType = {
    title: string;
    btnType?: "positive" | "negative" | "cancel";
    btnHeight?: "small" | "medium" | "large" | "full";
    btnWidth?: "narrow" | "normal" | "wide" | "wider" | "full";
    customStyle?: string; // user can use his own style
    iconType?: "info" | "alert" | "question" | undefined;
    hoverEffect?: boolean;
    handleClick?: () => void;
}

const Button = ({title, handleClick, btnType, btnHeight, btnWidth, hoverEffect, customStyle, iconType}: ButtonType) => {

  let width = ""
  switch (btnWidth) {
    case 'narrow':
      width = "w-1/4"
    case 'normal':
      width = "w-1/2";
      break;
    case 'wide':
      width = "w-2/3";
      break;
    case 'wider':
      width = "w-3/4"
    case 'full':
      width = "w-full";
      break;
  }

  let height = "";
  switch (btnHeight) {
    case 'small':
      height = "h-[25px]"
    case 'medium':
      height = "h-[35px]"
    case 'large':
      height = "h-[45px]"
  }

  let defaultStyle = "";
  switch (btnType) {
    case 'cancel':
      defaultStyle = "bg-white text-[#626F47] dark:text-[#A27B5C] border border-[#626F47] dark:border-[#A27B5C]";
      break;
    case 'positive':
      defaultStyle = "bg-[#D1F8EF] dark:bg-[#F0F0D7] text-[#3674B5] dark:text-[#727D73] border border-[#A1E3F9] dark:border-[#727D73]  ";
      break;
    case 'negative':
      defaultStyle = "bg-[#FA7070] text-[#FEFDED] dark:text-[#FEFDED] dark:border-[#FEFDED]";
    break;
  }

  let btnIcon;
  switch (iconType) {
    case "info":
      btnIcon = <BsFillInfoCircleFill />
        ;
      break;
    case "alert":
      btnIcon = <BsFillExclamationCircleFill />
      ;
      break;
    case "question":
      btnIcon = <BsFillQuestionCircleFill />
;
      break;
  }

  const hoverStyle = hoverEffect && "hover:opacity-50";

  const endStyle = `${width} ${height} ${defaultStyle} ${hoverStyle} rounded-md tracking-wider font-bold uppercase flex flex-row gap-2 justify-center items-center`

  return (
    <button
      type='button' 
      onClick={handleClick ? handleClick : () => {}}
      className={customStyle ? customStyle + " flex flex-row gap-2 justify-center items-center" : endStyle}
    >
      <span className='text-xl'>
        {iconType && btnIcon}
      </span>
      {btnType === "cancel" ? "cancel" : title}
    </button>
  )
}

export default Button