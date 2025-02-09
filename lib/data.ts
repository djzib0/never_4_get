import { UserSettingsType } from "./types";
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

export const getSettingsData = async (userId: string | undefined) => {
    // fetch entry data by entry id
    const res = await fetch(`http://localhost:3000/api/settings/${userId}`)
  
    if (!res.ok) {
      throw new Error("Couldn't not fetch settings data.")
    }
  
    return res.json();
  }

  export const defaultSettings: UserSettingsType = {
    _id: "defaultSettingsId",
    isDarkModeOn: false,
  }
