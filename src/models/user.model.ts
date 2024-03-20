import mongoose, { Document, Model } from "mongoose";

interface User extends Document {
  user_name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel: Model<User> = mongoose.model<User>("Users", userSchema);

export default userModel;
export { User };
