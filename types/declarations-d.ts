declare module "next-auth" {
  interface User {
    // extends DefaultUser["user"]
    id: string
  }

  interface Account {}
  interface Session {}
}

import { JWT } from "next-auth/jwt"
declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
  }
}
