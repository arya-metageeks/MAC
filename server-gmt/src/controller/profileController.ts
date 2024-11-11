import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Profile from "../model/profileModel";
import { getSignedUrlForUpload, getSignedUrlsForUploadPreview } from "../utils/s3";

export const addProfileDetails = catchAsyncError(async (req,res,next) => {
  const profile = await Profile.create(req.body);
  res.status(200).json({ success: true, profile });
});

export const uploadBannerprofile = catchAsyncError(async (req, res, next) => {

  const { fileName, uuid } = req.body;
  const url = await getSignedUrlForUpload(fileName, uuid);
  res.status(200).json({ success: true, url });
});

export const getAllProfiles = catchAsyncError(async (req, res, next) => {

  const profiles = await Profile.find();
  res.status(200).json({ success: true, profiles });
}
)