import express,{ Request, Response } from "express";
import { addProfileDetails, uploadBannerprofile, getAllProfiles } from "../controller/profileController";
const profileRouter = express.Router();

profileRouter.post('/', addProfileDetails);
profileRouter.post('/s3/image', uploadBannerprofile);
profileRouter.get('/allProfiles', getAllProfiles);

export default profileRouter;
