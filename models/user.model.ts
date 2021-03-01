import { model, Schema } from "mongoose"
import { IUser } from "../interfaces/user.interface"


const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)