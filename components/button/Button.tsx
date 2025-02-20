import React, { useEffect } from 'react'

type ButtonType = {
    title: string;
    type: "confirm" | "edit" | "cancel";
    size: "small" | "medium" | "large" | "full";
    color: string;
    darkColor: string;
    handleClick?: () => void;
}

const Button = ({title, handleClick, type, size, color, darkColor}: ButtonType) => {

  let btnWidth = ""
  switch (size) {
    case 'small':
      btnWidth = "w-[60px]"
    case 'medium':
      btnWidth = "w-[80px]";
      break;
    case 'large':
      btnWidth = "w-[120px]";
      break;
    case 'full':
      btnWidth = "w-full";
      break;
  }

  let btnHeight = "";
  switch (size) {
    case 'small':
      btnHeight = "h-[40px]"
    case 'medium':
      btnHeight = "h-[45px]"
    case 'large':
      btnHeight = "h-[50px]"
    case 'full':
      btnHeight = "h-[40px]"
  }


  return (
    <button 
      type='button' 
      className={`${btnWidth} ${btnHeight} ${color} ${darkColor} rounded-md tracking-wider font-bold uppercase`}
    >
      {title}
    </button>
  )
}

export default Button