'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


const Navbar =  () => {

  const pathName = usePathname();

  return (
    <nav className='nav__container'>
      <div className='nav__logo'>
        N4G
      </div>
      <div className='nav__links'>
        <Link 
          href={"/"} 
          className={pathName === "/" ? 'link__active' :'nav__link'}
        >
          Home
        </Link>
        <Link 
          href={"/entries"} 
          className={pathName.startsWith("/entries") ? 'link__active' :'nav__link'}
        >
          Entries
        </Link>
      </div>
    </nav>
  )
}

export default Navbar