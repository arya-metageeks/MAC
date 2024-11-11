import Admin from "../model/adminModel";
import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { sendToken } from "../utils/sendToken";
import { TAdmin } from "../types/user";


export const createAdmin = catchAsyncError(async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName) {
        return next(new ErrorHandler("Please enter username", 400));
    }
    if (!password) {
        return next(new ErrorHandler("Please enter password", 400));
    }
    const admin = await Admin.create({ userName, password });
    sendToken(admin, 201, res);
});

export const loginAdmin = catchAsyncError(async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return next(new ErrorHandler("Please enter username and password", 400));
    }
    const admin = await Admin.findOne({ userName }).select("+password");
    if (!admin) {
        return next(new ErrorHandler("Invalid username or password", 401));
    }
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid username or password", 401));
    }
    sendToken(admin, 200, res);
});

export const getCurrentAdmin = catchAsyncError(async (req, res, next) => {
    const admin = req.user as TAdmin;
    
    const currentAdmin = await Admin.findById(admin._id);
    res.status(200).json({admin:currentAdmin});
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {

    res.status(200).cookie("token", null).json({message:"Logout successfully"});
});
