'use server'
import { revalidatePath } from "next/cache";
import { Entry, EntryComment, EntryPosition, User, UserSettings } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { EntryPositionType, EntryType, UserSettingsType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEntry = async (prevState: any, formData: FormData) => {
    'use server'
    const title = formData.get("title")
    const userId = formData.get("userId");

    try {
        connectToDb();
        const newEntry = new Entry({
            title,
            userId,
            positions: [],
            comments: [],
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
            title,
            note: ""
        })
        
        const update = {$push: {positions: newPosition._id}};

        await Entry.findByIdAndUpdate(
            entryId,
            update,
            {new: true}
        ).populate("positions")

        revalidatePath("/entries")

        return {...prevState, success: true}

    } catch (error) {
        console.log(error, "error")
    }
}

export const deleteEntryPosition = async (entryId: string, entryPositionId: string) => {
    'use server'

    try {
        connectToDb();
        await EntryPosition.findByIdAndDelete(entryPositionId)

        const update = {$pull: {positions: entryPositionId}}

        await Entry.findByIdAndUpdate(
            entryId,
            update
        )

        revalidatePath("/entries")

        return {success: true}

    } catch (error) {
        return error
    }
}

export const updateEntryPosition = async (entryPosition: EntryPositionType) => {
    'use server'

    const entryPositionId = entryPosition._id

    const response = await fetch(`${process.env.API_URL}/api/entryPositions/${entryPositionId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            { 
                ...entryPosition,
            }
        ), // Field to update
      });

      revalidatePath(`entries/${entryPosition._id}`)

      return response.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEntryComment = async (prevState: any, formData: FormData) => {
    'use server'

    const {comment, entryId} = Object.fromEntries(formData)

    try {
        await connectToDb();
        const newComment = await EntryComment.create({
            comment: comment
        })

        const update = {$push: {comments: newComment._id}};

        await Entry.findByIdAndUpdate(entryId, update, {new: true})
        .populate("comments").exec();

        revalidatePath("/entries")
        return {...prevState, success: true}

    } catch (error) {
        return {error: error}
    }
}

export const editEntryComment = async (commentId: string, newComment: string) => {
    'use server'
    
    try {
        await connectToDb();
    
        const updatedComment = await EntryComment.findByIdAndUpdate(
            commentId,
            {comment: newComment},
            {new: true, runValidators: true}
        )

        if (!updatedComment) {
            throw new Error("Comment not found")
        }

        revalidatePath("/entries")
        return {success: true}

    } catch (error) {
        return {error: error}
    }
}

export const deleteEntryComment = async (commentId: string, entryId: string) => {
    'use server'

    try {
        await connectToDb();

        const deletedComment = await EntryComment.findByIdAndDelete(commentId)

        if (!deletedComment) {
            throw new Error("Comment not found.");
        }

        const updatedEntry = await Entry.findByIdAndUpdate(
            entryId,
            {$pull: {comments: commentId}},
            {new: true}
        )

        if (!updatedEntry) {
            throw new Error ("Entry not found")
        }

        revalidatePath("/entries")
        return {success: true}

    } catch (error) {
        return {error: error}
    }
}

export const addPositionNote = async (entryPositionId: string, note: string) => {
    'use server'

    try {
        
        await connectToDb();

        const newNote = await EntryPosition.findByIdAndUpdate(
            entryPositionId,
            {$set: {note: note}},
            {new: true}
        )

        if (!newNote) {
            throw new Error("Entry position not found")
        }

        revalidatePath("/entries")
        return {success: true}

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
        }
    }
}

export const handleSignOut = async () => {
    'use server'
    try {
        await signOut();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        if (error.message.includes("NEXT_REDIRECT")) {
            redirect("/login")
        }
        return {error: "An error during logout has occured"}
    }

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
            return {error: "User already exists."}
        }

        // check if email already exists
        // if exists, return an error
        const userEmail = await User.findOne({email})

        if (userEmail) {
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
            settings: settings._id,
        })

        await newUser.save();

        return {...prevState, success: true}
    } catch (err) {
        console.log(err)
        return {...prevState, error: "Something went wrong."}
    }
}

export const updateSettings = async (settings: UserSettingsType) => {
    'use client'
    const settingsId = settings._id

    const response = await fetch(`${process.env.API_URL}/api/settings/edit/${settingsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            { 
                ...settings,
                // isDarkModeOn: settings.isDarkModeOn
            }
        ), // Field to update
      });

      return response.json()
}

export const updateEntry = async (entry: EntryType) => {
    'use client'

    const response = await fetch(`${process.env.API_URL}/api/entries/${entry._id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            { 
                ...entry,
            }
        ), // Field to update
      });

    if (response.ok) {
        revalidatePath(`/entries/${entry._id}`)
    }
     
    return response.json()
}

export const deleteEntry = async (entryId: string) => {
    'use server'

    try {
        await connectToDb();

        await Entry.findByIdAndDelete(entryId);


    } catch (error) {
        console.log(error);
        throw new Error("Comment not found.");
    }
}

export const getEntriesData = async (userId: string) => {
    const res = await fetch(`${process.env.API_URL}/api/entries/all/${userId}`)
  
    if (!res.ok) {
       throw new Error("Something went wrong sir")
    }
  
    return res.json();
}

export const getFavoritesEntriesData = async (userId: string) => {
    const res = await fetch(`${process.env.API_URL}/api/entries/favorites/${userId}`)

    if (!res.ok) {
        throw new Error("Something went wrong")
    }

    return res.json();
}

export const getActiveEntries = async (userId: string) => {
    const res = await fetch(`${process.env.API_URL}/api/entries/active/${userId}`)
  
    if (!res.ok) {
        throw new Error("Something went wrong")
    }
  
    return res.json();
}



