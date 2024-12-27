import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 5,
    max: 20,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 5,
    max: 15,
  },
  picturePath: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  likedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
