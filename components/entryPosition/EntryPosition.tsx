'use client'

import { EntryPositionType } from '@/lib/types'
import React from 'react'

const EntryPosition = ({entryPosition}: {entryPosition: EntryPositionType}) => {
 

  return (
    <div>
      {entryPosition && entryPosition.title}
    </div>
  )
}

export default EntryPosition