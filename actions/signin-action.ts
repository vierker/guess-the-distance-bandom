"use Server"

import { IState } from "@/types/shared-t"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function signInAction(
  prevState: IState,
  formData: FormData
): Promise<IState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    })
    return { message: "Prisijungta", isSaved: true }
  } catch (error: any) {
    if (error instanceof AuthError) {
      const err: any = error as any
      const errorOb = JSON.parse(err["cause"].err.message)[0]
      return {
        errors: { [errorOb.path[0]]: [errorOb.message] },
        message: "Nepavyko prisijungti",
        isSaved: false,
      }
    }
    const errorOb = error["cause"]?.err
      ? JSON.parse(error["cause"].err?.message)[0]
      : null
    if (!errorOb) {
      throw error
    }
    return {
      errors: { general: [errorOb?.message] },
      message: "Nepavyko prisijungti",
      isSaved: false,
    }
  }
}
