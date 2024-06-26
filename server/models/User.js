import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  assocPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  bio: String,
  banned: Boolean,
  admin: Boolean,
  picture: String,
});

const User = model("User", userSchema);
export default User;
