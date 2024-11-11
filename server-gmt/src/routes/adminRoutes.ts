
import express from "express";
import { createAdmin, getCurrentAdmin, loginAdmin, logoutAdmin } from "../controller/adminController";
import { isAuthenticatedAdmin } from "../middlewere/auth";
const adminRouter = express.Router();

adminRouter.route("/signup").post(createAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/current").get(isAuthenticatedAdmin, getCurrentAdmin);
adminRouter.route("/logout").get( logoutAdmin);

export default adminRouter;

