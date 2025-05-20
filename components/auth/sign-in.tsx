"use client"

import { SubmitButton } from "../parts/submit-button"
import { TextField } from "../parts/text-field"
import { useFormState } from "react-dom"
import { signInAction } from "@/actions/signin-action"
import { IState } from "@/types/shared-t"
import { registerDto } from "@/dto/register-dto"

export function SignIn() {
  const [state, formAction] = useFormState<IState, FormData>(
    signInAction,
    registerDto
  )

  return (
    <form className="space-y-12 w-full sm:w-96" action={formAction}>
      <div className="grid grid-cols-2">
        <TextField
          label="El. paštas"
          name="email"
          isRequired={true}
          type="email"
          errors={state?.errors?.email}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Slaptažodis"
          name="password"
          isRequired={true}
          type="password"
          errors={state?.errors?.password}
        />
      </div>
      <div className="w-full">
        <SubmitButton name="Prisijungti" />
      </div>
      {state?.errors?.general ? (
        <div className="mt-1 col-span-2 p-1 bg-red-100 italic text-sm">
          {state.errors.general.join(" | ")}
        </div>
      ) : null}
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
