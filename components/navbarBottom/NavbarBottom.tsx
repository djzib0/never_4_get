'use client'
import Link from 'next/link';
import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { CiCirclePlus } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';

const NavbarBottom = () => {

  // utilize pathname for active links
  const pathName = usePathname();
  

  return (
    <nav className={`nav__container !bg-lime-100 fixed bottom-0`}>
      <Link 
        href={"/"} 
        className={`nav__icon ${pathName === "/" ? 'link__active': ''}`}
      >
        <IoHomeOutline />
      </Link>

      <Link 
        href={"/entries"} 
        className={`nav__icon ${pathName === "/entries" ? 'link__active': ''}`}
      >
        <GrTask />
      </Link>

      <Link 
        href={"/add"} 
        className={`nav__icon nav__icon--center !bg-lime-100 ${pathName === "/add" ? 'link__active': ''}`}
      >
        <CiCirclePlus />
      </Link>

      <div className={`nav__icon`}>
        {/* Empty to keep other icons away from center one -
         cheap trick, I know ;) */}
      </div>

      <Link 
        href={"/favorites"} 
        className={`nav__icon ${pathName === "/favorites" ? 'link__active' : ''}`}
      >
        <GrFavorite />
      </Link>

      <Link 
        href={"/settings"} 
        className={`nav__icon ${pathName === "/settings" ? 'link__active' : ''}`}
      >
        <IoSettingsOutline />
      </Link>


    </nav>
  )
}

export default NavbarBottom