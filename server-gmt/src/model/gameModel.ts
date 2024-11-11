import mongoose, { Schema, Document } from "mongoose";
import { TGame } from "../types/game";

const gameSchema: Schema = new Schema({
  title: { type: String, required: true },
  uuid: { type: String, required: true },
  platform: [{ type: String, required: true }],
  recommendedAge: { type: Number, required: true },
  developer: { type: String, required: true },
  publisher: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  category: { type: String, required: true },
  socialMedia: [
    {
      platform: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  downloadLink: { type: String, required: true },
  trailerLink: { type: String, required: true },
  overView: { type: String, required: true },
  banner: { type: String, required: true },
  previewImages: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  isDeleted: { type: Boolean, default: false },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userName: { type: String, required: true },
      review: { type: String, required: true },
      stars: { type: Number, required: true },
      date: { type: Date, required: true },
      userProfile: { type: String, required: true },
    },
  ],
  minimumConfiguration: {
    os: { type: String },
    processor: { type: String },
    graphics: { type: String },
    memory: { type: String },
    storage: { type: String }
  },
  recommendedConfiguration: {
    os: { type: String },
    processor: { type: String },
    graphics: { type: String },
    memory: { type: String },
    storage: { type: String }
  }
});

const gameModel = mongoose.model<TGame>("Game", gameSchema);

export default gameModel;
