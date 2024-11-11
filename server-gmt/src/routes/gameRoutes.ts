import express, { Request, Response } from "express";
import {
  addGameDetails,
  uploadBanner,
  uploadPreview,
  getGameDetails,
  getAllGames,
  softDeleteGame,
  updateGame,
  addReview,
  getSignedUrlForS3UploadController,
} from "../controller/gameController";

const gameRouter = express.Router();

gameRouter.post("/", addGameDetails);
gameRouter.get("/", getAllGames);
gameRouter.get("/:id", getGameDetails);
gameRouter.put("/:id", updateGame);
gameRouter.delete("/:id", softDeleteGame);
gameRouter.post("/s3/banner", uploadBanner);
gameRouter.post("/s3/preview", uploadPreview);
gameRouter.post("/:id/review", addReview);
gameRouter.post("/s3/upload", getSignedUrlForS3UploadController);

export default gameRouter;
