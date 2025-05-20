import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "El. Pašto adresas privalomas" })
    .email("Blogas el. pašto adresas")
    .transform((value) => value.replaceAll(" ", "")),
  password: string({ required_error: "Slaptažodis privalomas" })
    .min(7, "Slaptažodis turi būti ilgesnis nei 7 simboliai")
    .max(32, "Slaptažodis turi būti trumpesnis nei 32 simboliai"),
})

export const signUpSchema = signInSchema.extend({
  username: string({ required_error: "El. pašto adresas privalomas" }).min(
    2,
    "Vardas turi būti ilgesnis nei 2 simboliai"
  ),
})
