import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/userModel";
import {
  getSignedUrlForS3Upload,
  getSignedUrlForUpload,
  getSignedUrlsForUploadPreview,
} from "../utils/s3";
import Game from "../model/gameModel";

export const addGameDetails = catchAsyncError(async (req, res, next) => {
  const game = await Game.create(req.body);
  res.status(200).json({ success: true, game });
});

export const uploadBanner = catchAsyncError(async (req, res, next) => {
  const { fileName, uuid } = req.body;
  const url = await getSignedUrlForUpload(fileName, uuid);
  res.status(200).json({ success: true, url });
});

export const uploadPreview = catchAsyncError(async (req, res, next) => {
  const { fileNames, uuid } = req.body;
  const urls = await getSignedUrlsForUploadPreview(fileNames, uuid);
  res.status(200).json({ success: true, urls });
});

export const getGameDetails = catchAsyncError(async (req, res, next) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    return next(new ErrorHandler("Game not found", 404));
  }
  res.status(200).json({ success: true, game });
});

export const getAllGames = catchAsyncError(async (req, res, next) => {
  const games = await Game.find({ isDeleted: false });
  res.status(200).json({ success: true, games });
});

export const updateGame = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the game ID from the request parameters
  const updatedGame = await Game.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }); // Update the game

  if (!updatedGame) {
    return next(new ErrorHandler("Game not found", 404)); // Handle case where game is not found
  }

  res.status(200).json({
    message: "Game upadated successfully",
    success: true,
    game: updatedGame,
  }); // Return the updated game
});

export const softDeleteGame = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updatedGame = await Game.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  ); // Soft delete the game

  if (!updatedGame) {
    return next(new ErrorHandler("Game not found", 404)); // Handle case where game is not found
  }

  res.status(200).json({
    success: true,
    message: "Game deleted successfully",
    game: updatedGame,
  }); // Return the updated game
});

export const addReview = catchAsyncError(async (req, res, next) => {
  const review = await Game.findByIdAndUpdate(
    req.params.id,
    { $push: { reviews: req.body } },
    { new: true }
  );
  res.status(200).json({ success: true, review });
});

export const getSignedUrlForS3UploadController = catchAsyncError(
  async (req, res, next) => {
    const { key, contentType } = req.body;
    const url = await getSignedUrlForS3Upload(key, contentType);
    res.status(200).json({ success: true, url });
  }
);
