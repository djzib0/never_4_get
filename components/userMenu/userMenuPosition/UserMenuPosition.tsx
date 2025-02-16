import { UserMenuPositionType } from '@/lib/types';
import Link from 'next/link';
import React from 'react'

const UserMenuPosition = ({icon, title, path, func}: UserMenuPositionType) => {
  return (
    <>
      {func && <button 
        className='flex flex-row items-center justify-start w-32 px-2 uppercase'
        onClick={func}
      >
        <>{icon}</>
        <p className='ml-2'>{title}</p>
      </button>}
      {path && 
        <Link href={path} 
          className='flex flex-row items-center justify-start w-32 px-2 uppercase'
        >
          <>{icon}</>
          <p className='ml-2'>{title}</p>
        </Link>
      }
    </>
  )
}

export default UserMenuPosition