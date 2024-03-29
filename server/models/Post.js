import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  text: String,
  categories: Array(String),
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  comments: [{ text: "string", createdBy: mongoose.Schema.Types.ObjectId }],
});

const Post = model("Post", postSchema);

export default Post;
