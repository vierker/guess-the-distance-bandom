import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparePassword } from "@/utils/password"
import { connMongoose } from "./utils/connect-mongoose"
import { User } from "./user-model"
import { signInSchema } from "./utils/form/login-validator"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials)
        await connMongoose()
        const user = await User.findOne({ email })

        if (!user)
          throw new Error(
            JSON.stringify([
              {
                message: ["Vartotojas nerastas."],
                path: ["email"],
              },
            ])
          )
        const passwordMatches = await comparePassword([password, user.password])

        if (!passwordMatches)
          throw new Error(
            JSON.stringify([
              {
                message: ["Neteisingas slaptažodis."],
                path: ["password"],
              },
            ])
          )
        return {
          id: user._id,
          email: user.email,
          name: user.username,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },

  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.sub as string
      return session
    },
  },
})
