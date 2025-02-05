'use server'
import { revalidatePath } from "next/cache";
import { Entry, EntryPosition, User, UserSettings } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEntry = async (prevState: any, formData: FormData) => {
    
    const title = formData.get("title")
    const userId = formData.get("userId");

    try {
        connectToDb();
        const newEntry = new Entry({
            title,
            userId,
            positions: []
        })
        await newEntry.save()
        revalidatePath("/entries")
        return {...prevState, success: true}
    } catch (error) {
        return {error: error}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEntryPosition = async (prevState: any, formData: FormData) => {
    'use server'

    const {title, entryId} = Object.fromEntries(formData)

    try {
        connectToDb();
        const newPosition = await EntryPosition.create({
            title
        })
        const update = {$push: {positions: newPosition._id}};
        const entry = await Entry.findByIdAndUpdate(
            entryId,
            update,
            {new: true}
        ).populate("positions")
        console.log('Update entry', entry)
        revalidatePath("/entries")
        return {...prevState, success: true}
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEntryComment = async (prevState: any, formData: FormData) => {
    'use server'

    const {comment, entryId} = Object.fromEntries(formData)

    try {
        console.log(comment, entryId, "adding comment to the entry moin.")
        return {...prevState}
    } catch (error) {
        return {error: error}
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleSignIn = async (prevState: any, formData: FormData) => {
    'use server'

    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", {username, password})
        revalidatePath("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error) 
        if (error.message.includes("credentialssignin")) {
            return {error: "Wrong username or password!"}
        } else {
            redirect("/")
            return {success: "Logged in!"}
        }
        throw error   
    }
}

export const handleSignOut = async () => {
    'use server'
    await signOut();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerNewUser = async (prevState: any, formData: any) => {
    // 'use server'
    const {username, password, email, passwordRepeat, img} = Object.fromEntries(formData)

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }

    try {
        connectToDb();

        // check if the user already exists
        const user = await User.findOne({username})

        // if user exists, return an error
        if (user) {
            console.log("This user already exists, my friend.")
            return {error: "User already exists."}
        }

        // check if email already exists
        // if exists, return an error
        const userEmail = await User.findOne({email})

        if (userEmail) {
            console.log("This email is used, my friend.")
            return {error: "This email is already registered."}
        }

        // hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // if the user or email doesn't exist in the DB,
        // create a new one and save in DB.

        const settings = await UserSettings.create({});

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
            settings: settings._id
        })

        await newUser.save();
        console.log("new user saved to db")

        return {...prevState, success: true}
    } catch (err) {
        console.log(err)
        return {...prevState, error: "Something went wrong."}
    }
}
