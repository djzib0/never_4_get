'use client'
import { useSettings } from '@/lib/utilComponents/SettingsContext';
import Image from 'next/image';
import { PiUserCircle } from 'react-icons/pi';
import UserMenu from '../userMenu/UserMenu';
import useUserMenu from '@/lib/utilComponents/useUserMenu';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import { useEffect, useState } from 'react';

const Navbar = ({imgUrl, username}: {imgUrl: string | undefined | null, username: string}) => {

  // utilize custom hook
  const {isMenuOn, toggleUserMenu} = useUserMenu()

  // utilize context
  const { changeTheme} = useSettings();

  // state variables
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  // Function to check if the URL is an image
  const checkIfImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('image/')) {
        setIsValidImage(true); // It's an image
      } else {
        setIsValidImage(false); // Not an image
      }
    } catch (error) {
      if (error) setIsValidImage(false); // If fetching fails, it's not an image
    }
  };

  useEffect(() => {
    if (imgUrl) {
      checkIfImage(imgUrl); // Check if imgUrl is an image
    }
  }, [imgUrl]);
  

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
            src={isValidImage ? imgUrl : "https://i.seadn.io/gae/EJ0jGsyn9HqmIilFVwUL-knd-cOEata2lSJSZgHfs_Tsne6cHJeqG1VJWwmSjw3N97_g8onMzw21ZHsA-IBkVw-s7ZsPHrvpCNZvAlI?auto=format&dpr=1&w=1000"} 
            height={40} 
            width={40} 
            alt='user avatar'
            className='avatar__img'
            />
            : <PiUserCircle />}
          </button>
        </div>
      </div>

      <UserMenu isMenuOn={isMenuOn} />
    </nav>
  )
}

export default Navbar
