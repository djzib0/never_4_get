import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { connectToDb } from "./lib/utils";
import { User } from "./lib/models";
import {authConfig} from "@/lib/auth.config"
// import Google from "next-auth/providers/google";
// import Facebook from "next-auth/providers/facebook";

const login = async (credentials) => {
  try {
    connectToDb();
    // try to find user in DB
    const user = await User.findOne({username: credentials.username})
  
    // if user is not found return information that the credentials are wrong
    if (!user) {
      throw new Error("Wrong credentials.")
    }

    // if user is found, compare form password and hashed password
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

    // if the passwords is not correct
    if (!isPasswordCorrect) {
      throw new Error("Wrong password.")
    }

    return user
  
  } catch (error) {
    console.log(error)
    throw new Error("Failed to login.")
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    // Facebook({
    //   clientId: process.env.AUTH_FACEBOOK_ID,
    //   clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    // }),
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials)

          return user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // return {error: "dupa"};
          return null
        }
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({user, account, profile})  {
      if (account?.provider === 'github') {
        connectToDb();
        try {
          const user = await User.findOne({email: profile?.email});
          if (!user) {
            const newUser = new User({
              username: profile?.username,
              email: profile?.email,
              img: profile?.avatar_url,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      if (account?.provider === 'facebook') {
        connectToDb();
        try {
          console.log(profile, " profile moin")
          const user = await User.findOne({email: profile?.email});
          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile?.email,
              img: profile?.picture,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      if (account?.provider === 'google') {
        connectToDb();
        try {
          const user = await User.findOne({email: profile?.email});
          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile?.email,
              img: profile?.picture,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true;
    },
    ...authConfig.callbacks
  }
})