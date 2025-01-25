'use server'
import { revalidatePath } from "next/cache";
import { Entry, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";

export const addEntry = async () => {
    const title = "Test title"

    try {
        connectToDb();
        const newEntry = new Entry({
            title
        })
        await newEntry.save()
        revalidatePath("/test")
    } catch (error) {
        return {error: error}
    }
}

export const addUser = async () => {
    try {
        connectToDb();
        const newUser = new User({
            userName: "batman",
            password: "test123",
            email: "batman@email.com",
            img: "",
            isAdmin: false,

        })
        await newUser.save();
        revalidatePath("/test")
    } catch (error) {
        return {error: error}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerNewUser = async (prevState: any, formData: FormData) => {
    'use server'
    console.log("I'm here")
    const userName = formData.get("userName");
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");
    const email = formData.get("email");
    const img = "";

    if (password !== passwordRepeat) {
        return {error: "Password do not match!"}
    }

    try {
        connectToDb();
        const user = await User.findOne({userName});

        if (user) {
            return {error: "User already exists"}
        }

        const userEmail = await User.findOne({email});

        if (userEmail) {
            return {error: "Email already exists"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt)

        const newUser = new User({
            userName,
            password: hashedPassword,
            email,
            img,
        })

        await newUser.save();
        
        return {success: true}

    } catch (error) {
        console.log(error)
        return {error: "Something went wrong"}
    }
}