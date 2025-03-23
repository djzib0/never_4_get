import { auth } from '@/auth'
import FavoritesPageContent from '@/components/favoritesPageContent/FavoritesPageContent'
import { getFavoritesEntriesData } from '@/lib/actions'
import { redirect } from 'next/navigation'
import React from 'react'

const FavoritesPage = async () => {

  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }
  
  const favoriteEntries = session.user.id && await getFavoritesEntriesData(session.user.id);
    
  return (
    <div className='content__container'>
      <FavoritesPageContent entries={favoriteEntries} />
    </div>
  )
}

export default FavoritesPage