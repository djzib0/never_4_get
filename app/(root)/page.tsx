'use server'

import { auth } from "@/auth";
import EntryElement from "@/components/entryElement/EntryElement";
import { getActiveEntries } from "@/lib/actions";
import { redirect } from "next/navigation";
import { EntryType } from "@/lib/types";

const  HomePage = async () => {
 
  const session = await auth();

  const entries = session?.user?.id && await getActiveEntries(session?.user?.id);

  // map through entries to display links to entry details
  const entriesLinksArr = entries.map((entry: EntryType) => {
    return (
      <EntryElement
        key={entry._id}
        id={entry._id}
        title={entry.title}
        isActive={entry.isActive}
        isFavourite={entry.isFavourite}
        positionsNumber={entry.positions.length}
        commentsNumber={entry.comments.length}
      />
    )
  })
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className='content__container '>
      <div className='flex flex-col gap-2'>
        {entriesLinksArr}
      </div>
    </div>
  )
}

export default HomePage
