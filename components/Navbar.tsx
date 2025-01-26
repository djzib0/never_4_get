import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/entries"}>Entries</Link>
    </div>
  )
}

export default Navbar