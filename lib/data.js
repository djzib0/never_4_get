import { User, Entry } from "./models";
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

