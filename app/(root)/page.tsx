'use server'

import { auth } from "@/auth";
import { getActiveEntries } from "@/lib/actions";
import { redirect } from "next/navigation";
import HomePageContent from "@/components/homePageContent/HomePageContent";

const  HomePage = async () => {
 
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login")
  }

  const entries = session?.user?.id && await getActiveEntries(session?.user?.id);

  return (
    <div className='content__container '>
        <HomePageContent entries={entries} />
    </div>
  )
}

export default HomePage
