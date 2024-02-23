import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  text: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  dateCreated: Date,
});

const Comment = model("Comment", commentSchema);

export default Comment;
