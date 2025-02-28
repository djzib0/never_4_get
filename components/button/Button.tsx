import React from 'react'
import { BsFillExclamationCircleFill, BsFillInfoCircleFill, BsFillQuestionCircleFill } from 'react-icons/bs';

type ButtonType = {
    title: string;
    btnHtmlType: "button" | "submit";
    btnVariant?: "positive" | "negative" | "cancel";
    btnHeight?: "small" | "medium" | "large" | "full";
    btnWidth?: "narrow" | "normal" | "half" | "wide" | "wider" | "full";
    customStyle?: string; // user can use his own custom style
    iconType?: "info" | "alert" | "question" | undefined;
    hoverEffect?: boolean;
    handleClick?: () => void;
}

const Button = ({title, btnHtmlType, handleClick, btnVariant, btnHeight, btnWidth, hoverEffect, customStyle, iconType}: ButtonType) => {

  let width = ""
  switch (btnWidth) {
    case 'narrow':
      width = "w-1/4 text-xs tracking-widest";
      break;
    case 'normal':
      width = "w-1/3 tracking-widest";
      break;
    case 'half':
      width = "w-1/2 tracking-widest";
      break;
    case 'wide':
      width = "w-2/3 tracking-widest";
      break;
    case 'wider':
      width = "w-3/4 tracking-widest";
      break
    case 'full':
      width = "w-full tracking-widest";
      break;
  }

  let height = "";
  switch (btnHeight) {
    case 'small':
      height = "h-[25px] text-xs";
      break;
    case 'medium':
      height = "h-[35px]"
      break;
    case 'large':
      height = "h-[45px]"
      break;
  }

  let defaultStyle = "";
  switch (btnVariant) {
    case 'cancel':
      defaultStyle = "bg-white text-[#626F47] dark:text-[#A27B5C] border border-[#626F47] dark:border-[#A27B5C]";
      break;
    case 'positive':
      defaultStyle = "text-white dark:text-[#3C3D37] bg-[#8EACCD] dark:bg-[#ECDFCC] rounded-md";
      break;
    case 'negative':
      defaultStyle = "bg-[#FA7070] text-[#FEFDED] dark:text-[#FEFDED] dark:border-[#FEFDED]";
      break;
  }

  let btnIcon;
  switch (iconType) {
    case "info":
      btnIcon = <BsFillInfoCircleFill />;
      break;
    case "alert":
      btnIcon = <BsFillExclamationCircleFill />;
      break;
    case "question":
      btnIcon = <BsFillQuestionCircleFill />;
      break;
  }

  const hoverStyle = hoverEffect && "hover:opacity-50";

  const endStyle = `${width} ${height} ${defaultStyle} ${hoverStyle} my-2 rounded-md tracking-wider font-bold uppercase flex flex-row gap-2 justify-center items-center`

  return (
    <button
      type={btnHtmlType}
      onClick={handleClick ? handleClick : () => {}}
      className={customStyle ? customStyle + " flex flex-row gap-2 justify-center items-center" : endStyle}
    >
      <span className='text-xl'>
        {iconType && btnIcon}
      </span>
      {btnVariant === "cancel" ? "cancel" : title}
    </button>
  )
}

export default Button