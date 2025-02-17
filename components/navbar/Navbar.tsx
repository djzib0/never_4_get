'use client'
import { useSettings } from '@/lib/utilComponents/SettingsContext';
import Image from 'next/image';
import { PiUserCircle } from 'react-icons/pi';
import UserMenu from '../userMenu/UserMenu';
import useUserMenu from '@/lib/utilComponents/useUserMenu';

const Navbar = ({imgUrl, username}: {imgUrl: string | undefined | null, username: string}) => {

  // utilize custom hook
  const {isMenuOn, toggleUserMenu} = useUserMenu()

  // utilize context
  const { changeTheme} = useSettings();

  // toggle user menu
  // const toggleUserMenu = () => {
  //   setIsUserMenuOn(prevState => !prevState)
  // }

  return (
    <nav className={`nav__container`}>
    {/* <nav className={`nav__container-dark`}> */}
      <div className='nav__logo'>
        N4G
      </div>
      <button onClick={changeTheme}>Change theme</button>
      {username && <p className='text-base'>Hi, {username}</p>}
      <div className='nav__links'>
        <button
          onClick={() => toggleUserMenu()}
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
      <UserMenu isMenuOn={isMenuOn} />
    </nav>
  )
}

export default Navbar
