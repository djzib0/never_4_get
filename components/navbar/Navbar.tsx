'use client'
import { useSettings } from '@/lib/utilComponents/useSettings';
import Image from 'next/image';
import { useState } from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { handleSignOut } from '@/lib/actions';
import Switcher from '../switcher/Switcher';


const Navbar = ({imgUrl, username}: {imgUrl: string | undefined | null, username: string}) => {

  // state variables
  const [isUserMenuOn, setIsUserMenuOn] = useState(false);

  // utilize context
  const {settings, changeTheme} = useSettings();

  // toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOn(prevState => !prevState)
  }

  return (
    <nav className={`nav__container `}>
    {/* <nav className={`nav__container-dark`}> */}
      <div className='nav__logo'>
        N4G
      </div>
      <button onClick={changeTheme}>Change theme in context</button>
      <Switcher />
      {username && <button onClick={() => handleSignOut()}>Logout</button>}
      <p>{username}</p>
      <div className='nav__links'>
        <button
          onClick={toggleUserMenu}
          className={`avatar__btn`}
        >
          {imgUrl ? 
          <Image 
          src={imgUrl} 
          height={40} 
          width={40} 
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
