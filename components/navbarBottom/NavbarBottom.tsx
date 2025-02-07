import Link from 'next/link';
import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { CiCirclePlus } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

const NavbarBottom = () => {
  return (
    <nav>
      <Link href={"/"} className={`nav__icon`}>
        <IoHomeOutline />
      </Link>

      <Link href={"/entries"} className={`nav__icon`}>
        <GrTask />
      </Link>

      <Link href={"/"} className={`nav__icon--center`}>
        <CiCirclePlus />
      </Link>

      <Link href={"/"} className={`nav__icon`}>
        <GrFavorite />
      </Link>

      <Link href={"/settings"} className={`nav__icon`}>
        <IoSettingsOutline />
      </Link>


    </nav>
  )
}

export default NavbarBottom