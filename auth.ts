import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "./lib/utils";
import { User } from "./lib/models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async (credentials: any) => {
  console.log(credentials, "credentials...")
  try {
    // connecting to database
    connectToDb();

    // looking for the user in database
    const user = await User.findOne({username: credentials.username})

    // if user is not found return error
    if (!user) {
      throw new Error("User not found.")
    };

    // if user is found, check password correctness
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    // if password is not correct
    if (!isPasswordCorrect) {
      throw new Error("Wrong password.")
    }

    // if everything is OK, return user
    console.log(user, " ... in auth.ts")
    return user;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to log in.")
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return null
        }
      }
    })
  ],
})