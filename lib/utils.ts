import { defaultSettings } from "./data";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: mongoose } = require("mongoose")  

export const connectToDb = async () => {
    const connection: {isConnected: boolean | undefined} = {
    isConnected: undefined
};

    try {
        if(connection.isConnected) {  
            console.log("Using existing connection")
            return;
        }
        const db = await mongoose.connect(process.env.MONGO); 
        connection.isConnected = db.connection[0].readyState;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export const saveToLocalStorage = <T>(key: string, obj: T): void => {
    try {
        const serializedData = JSON.stringify(obj);
        localStorage.setItem(key, serializedData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        throw new Error("Couldn't save data in local storage.", error)
    }
}

export const loadFromLocalStorage = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : defaultSettings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error("Couldn't load data from local storage", error)
    }
}