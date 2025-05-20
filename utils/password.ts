import bcrypt from "bcrypt"

export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}
