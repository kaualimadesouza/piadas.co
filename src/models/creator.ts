import mongoose, { mongo, Schema } from "mongoose";

const creatorSchema = new Schema(
  {
    name: String,
    description: String,
    piadas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Joke" }],
  },
  {
    timestamps: true,
  }
);

export const cre =
  mongoose.models.Creator || mongoose.model("Creator", creatorSchema);
