import { handleSignOut } from '@/lib/actions';
import React from 'react';
import UserMenuPosition from './userMenuPosition/UserMenuPosition';
import { FaUserGear } from "react-icons/fa6";
import { AiOutlinePoweroff } from "react-icons/ai";

const UserMenu = ({isMenuOn}: {isMenuOn: boolean}) => {

  return (
    <div className={isMenuOn ? `user__menu` : `user__menu invisible`}>
      <UserMenuPosition 
        icon={<FaUserGear />} 
        title={'Profile'} 
        path={'/'} 
      />
      <UserMenuPosition
        icon={<AiOutlinePoweroff />}
        title={'Logout'}
        func={() => (handleSignOut())}
       />
    </div>
  )
}

export default UserMenu