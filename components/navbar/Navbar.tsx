'use client'
import { useSettings } from '@/lib/utilComponents/SettingsContext';
import Image from 'next/image';
import { PiUserCircle } from 'react-icons/pi';
import UserMenu from '../userMenu/UserMenu';
import useUserMenu from '@/lib/utilComponents/useUserMenu';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

const Navbar = ({imgUrl, username}: {imgUrl: string | undefined | null, username: string}) => {

  // utilize custom hook
  const {isMenuOn, toggleUserMenu} = useUserMenu()

  // utilize context
  const { changeTheme} = useSettings();

  return (
    <nav className={`nav__container fixed top-0 border-[#FFCF50] border-b-2`}>

      <p className="relative text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FEFAE0] to-[#FEFAE0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        N4G
      </p>

      <div className='flex flex-row gap-8 justify-center items-center'>
        <button onClick={changeTheme}>
          <ThemeSwitcher />
        </button>
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
            unoptimized
            onError={(e) => {
              e.currentTarget.src = "/images/avatarplaceholder.png"
            }}
            />
            : <PiUserCircle className='w-12 h-12 -m-1' />}
          </button>
        </div>
      </div>

      <UserMenu isMenuOn={isMenuOn} />
    </nav>
  )
}

export default Navbar
