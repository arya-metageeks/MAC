import mongoose from "mongoose";

// create a model for joiners
const joinerSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamLogo: { type: String },
  captainName: { type: String, required: true },
  captainEmail: { type: String, required: true },
  members: [
    {
      name: { type: String },
      email: { type: String },
      gameId: { type: String },
    },
  ],
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
});

const JoinerModel = mongoose.model("Joiner", joinerSchema);

export default JoinerModel;
