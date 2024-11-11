import mongoose, { Schema, model } from "mongoose";
import type { Tournament } from "../types/tournaments";

const tournamentSchema = new Schema({
  tournamentId: { type: String, required: true, unique: true },
  banner: { type: String, required: true },
  logo: { type: String, required: true },
  tournamentName: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["upcoming", "ongoing", "completed"],
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  registration: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  prize: [
    {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, enum: ["USD", "INR"] },
    },
  ],
  gameMode: { type: String, required: true, enum: ["Solo", "Duo", "Squad"] },
  isDeleted: { type: Boolean, default: false },
});

const Tournament = model<Tournament>("Tournament", tournamentSchema);

export default Tournament;
