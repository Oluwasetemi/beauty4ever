import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { getUserFromDb } from "@/app/lib/actions";
import Credentials from "next-auth/providers/credentials";
// import { db } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = await bcrypt.hash(credentials.password as string, 10);

        // logic to verify if user exists
        user = await getUserFromDb(credentials.email as string);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // logic to compare hashed password TODO:
        const match = await bcrypt.compare(credentials.password as string, user.password);

        if (!match) {
          // Passwords don't match
          throw new Error("Password doesn't match.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
});
