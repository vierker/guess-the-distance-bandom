import { model, models, Schema } from "mongoose"

export interface IUser {
  id: string
  username: string
  email: string
  password: string
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Neteisingas el. pašto adresas.",
      ],
    },
    password: String,
  },
  {
    timestamps: false,
    collection: "users",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const User = models.User || model("User", UserSchema)
