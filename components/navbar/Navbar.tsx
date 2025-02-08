'use client'
import { useSettings } from '@/lib/useSettings';
import Image from 'next/image';
import { useState } from 'react';
import { PiUserCircle } from 'react-icons/pi';


const Navbar = ({imgUrl}: {imgUrl: string | undefined | null}) => {

  // state variables
  const [isUserMenuOn, setIsUserMenuOn] = useState(false);

  // toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOn(prevState => !prevState)
  }

  // utilize user settings
  const {settings} = useSettings();
  const theme = settings.isDarkModeOn === false ? "" : "-dark"

  return (
    <nav className={`nav__container${theme}`}>
    {/* <nav className={`nav__container-dark`}> */}
      <div className='nav__logo'>
        N4G
      </div>
      <div className='nav__links'>
        <button
          onClick={toggleUserMenu}
          className={`avatar__btn`}
        >
          {imgUrl ? 
          <Image 
          src={imgUrl} 
          height={50} 
          width={50} 
          alt='user avatar'
          className='avatar__img'
        />
          : <PiUserCircle />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
