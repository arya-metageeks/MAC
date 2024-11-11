import { Document } from "mongoose";

export type TParticipants = {
  position: number;
  userId: string;
  walletAddress: string;
  headShot: number;
  kills: number;
  userScore: number;
};

export type Tournament = Document & {
  banner: string;
  logo: string;
  status: "upcoming" | "ongoing" | "completed";
  tournamentName: string;
  startDate: Date;
  participants: {
    userId: string;
  }[];
  registration: {
    userId: string;
  }[];
  prize: {
    amount: number;
    currency: "USD" | "INR";
  }[];
  gameMode: "Solo" | "Duo" | "Squad";
  isDeleted: boolean;
};
