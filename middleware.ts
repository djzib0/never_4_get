// export { auth as middleware } from "@/auth"
import NextAuth from "next-auth";
import { authConfig} from "./lib/auth.config"

export default NextAuth(authConfig).auth;


export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
    unstable_allowDynamic: [
        // allows a single file
        // "/src/db/lib/dbConnect.js",
        // use a glob to allow anything in the function-bind 3rd party module
        "/node_modules/mongoose/dist/**",
    ],
  }