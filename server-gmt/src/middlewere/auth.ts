import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../model/userModel.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TAdmin, TUser } from "../types/user.js";
import Admin from "../model/adminModel.js";

declare global {
    namespace Express {
        interface Request {
            payloadName?: any;
        }
    }
}

interface CustomJwtPayload extends JwtPayload {
    id: string;
    accessToken: { accessToken: string; provider: string };
}

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    if (req.user) {
        req.payloadName = req.user;
    }
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jwt.verify( token, process.env.JWT_SECRET ) as CustomJwtPayload; 
    
    const user = await User.findOne({ _id: decodedData.id })
    if (!user) {
        return next(new ErrorHandler("user not found with associated token", 401));
    }
    req.user = user as TUser;

    next();
})

export const isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
    
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

    const admin = await Admin.findOne({_id: decodedData.id});
    if(!admin){
        return next(new ErrorHandler("Admin not found with associated token", 401));
    }
    req.user = admin as TAdmin;
    next();
})
