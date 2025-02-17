'use server'

import { auth } from "@/auth";
import { redirect } from "next/navigation";

const  Home = async () => {
 
  const session = await auth();

  if (!session?.user?.id) {
      redirect("/login")
    }

  return (
    <div className="content__container">
      
    </div>
  );
}

export default Home
