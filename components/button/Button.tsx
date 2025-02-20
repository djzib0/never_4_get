import React, { useEffect } from 'react'

type ButtonType = {
    title: string;
    type: "confirm" | "edit" | "cancel";
    size: "small" | "medium" | "large" | "full";
    color: string;
    handleClick?: () => void;
}

const Button = ({title, handleClick, type, size, color}: ButtonType) => {

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

  console.log(btnWidth)
  
  return (
    <button type='button' className={`${btnWidth} ${color}`}>{title}</button>
  )
}

export default Button