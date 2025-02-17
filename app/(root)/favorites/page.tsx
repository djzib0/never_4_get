import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const FavoritesPage = async () => {

  const session = await auth()

  if (!session?.user?.id) {
      redirect("/login")
    }
  
  return (
    <div>FavoritesPage</div>
  )
}

export default FavoritesPage