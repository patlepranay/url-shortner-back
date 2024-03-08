import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

export type User = {
  name: string;
  email: string;
  userName: string;
};

export const UserModel = mongoose.model("User", UserSchema);

export const getUsersByEmail = (email: string) => UserModel.findOne({ email });

export const createUser = (user: User) => {
  UserModel.create(user);
};
