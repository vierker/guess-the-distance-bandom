"use server"

import { IUser, User } from "@/user-model"
import { IState } from "@/types/shared-t"
import { connMongoose } from "@/utils/connect-mongoose"
import { signUpSchema } from "@/utils/form/login-validator"
import { saltAndHashPassword } from "@/utils/password"

export async function signUpAction(prevState: IState, formDate: FormData) {
  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parse = signUpSchema.safeParse(rawFormData)
  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Blogai užpildyti laukeliai!",
      isSaved: false,
    }
  }
  const dto = parse.data
  await connMongoose()
  const user = await User.findOne({ email: dto.email })
  if (user) {
    return {
      errors: { email: ["Toks el. paštas jau užregistruotas"] },
      message: "",
      isSaved: false,
    }
  }
  const newUser = new User({
    username: dto.username,
    email: dto.email,
    password: await saltAndHashPassword(dto.password),
  })
  await newUser.save()
  return {
    message: "Vartotojas sėkmingai sukurtas",
    isSaved: true,
  }
}
