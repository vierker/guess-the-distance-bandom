"use client"

import { signUpAction } from "@/actions/signup-action"
import { SubmitButton } from "../parts/submit-button"
import { TextField } from "../parts/text-field"
import { registerDto } from "@/dto/register-dto"
import { IState } from "@/types/shared-t"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

export function Register() {
  const [state, formAction] = useFormState<IState, FormData>(
    signUpAction,
    registerDto
  )
  const router = useRouter()
  if (state.isSaved) {
    router.push("/")
  }

  return (
    <form className="space-y-12 w-full sm:w-96" action={formAction}>
      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="El. paštas"
          name="email"
          isRequired={true}
          errors={state.errors?.email}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="Vardas"
          name="username"
          isRequired={true}
          errors={state.errors?.username}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="Slaptažodis"
          name="password"
          isRequired={true}
          errors={state.errors?.password}
        />
      </div>
      <div className="w-full">
        <SubmitButton name="Registruotis" />
      </div>
      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>
    </form>
  )
}
