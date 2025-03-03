'use client'
import { updateEntry } from '@/lib/actions';
import { EntryType } from '@/lib/types';
import React from 'react';

const EntryMenu = ({entry} : {entry: EntryType}) => {

  return (
    <div>
      <p>{entry.isActive ? "It's active" : "It's not active"}</p>
      <button onClick={() => updateEntry(entry, !entry.isActive, entry.isFavourite)}>Toggle isActive</button>
      <button onClick={() => updateEntry(entry, entry.isActive, !entry.isFavourite)}>Toggle isFavourite</button>
    </div>
  )
}

export default EntryMenu