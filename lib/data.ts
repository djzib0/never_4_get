import { connectToDb } from "./utils"


export const getEntries = async () => {
    try {
        connectToDb();
        const entries = ""
        return entries
    } catch (error) {
        return error
    }
}

export const getSettingsData = async (userId: string) => {
    // fetch entry data by entry id
    const res = await fetch(`http://localhost:3000/api/settings/${userId}`)
  
    if (!res.ok) {
      throw new Error("Couldn't not fetch settings data.")
    }
  
    return res.json();
  }
