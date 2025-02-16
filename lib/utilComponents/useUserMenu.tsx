import { useState } from 'react'

const useUserMenu = () => {

  const [isMenuOn, setIsMenuOn] = useState(false);

  const toggleUserMenu = (bool?: boolean) => {
    if (bool) {
      setIsMenuOn(bool)
    }

    setIsMenuOn(prevState => !prevState)
  }

  return {isMenuOn, toggleUserMenu}
}

export default useUserMenu