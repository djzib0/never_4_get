import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/test"}>Test Link</Link>
    </div>
  )
}

export default Navbar