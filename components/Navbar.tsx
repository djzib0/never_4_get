'use client'
import { useSettings } from '@/lib/useSettings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar = () => {

  // utilize pathname for active links
  const pathName = usePathname();

  const {settings} = useSettings();

  if (!settings) {
    return <p>Loading...</p>
  }


  console.log(settings.isDarkModeOn, "theme")
  const theme = settings.isDarkModeOn === true ? "-dark" : "";
  console.log(theme, "theme")
  

  return (
    <nav className={`nav__container${theme}`}>
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