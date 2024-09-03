import mongoose, { Schema } from "mongoose";

const JokeSchema = new Schema({
  title: String,
  text: String,
  creator: String,
  video_url: String,
  tags: String,
  likes: Number,
});

export const joke = mongoose.models.Joke || mongoose.model("Joke", JokeSchema);
