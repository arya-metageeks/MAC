import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Tournament from "../model/tournament";
import WaitingRoom from "../model/waitingRoom";
import User from "../model/userModel";
import type { TWaitingRoom } from "../model/waitingRoom";

export const addToWaitingRoom = catchAsyncError(async (req, res, next) => {

    const { tournamentId, userId, userWalletAddress } = req.body;

    if (!tournamentId || !userId || !userWalletAddress) {
        return next(new ErrorHandler('Please provide tournamentId , userId and userWalletAddress ', 400));
    }
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
        return next(new ErrorHandler('Tournament not found', 404));
    }
    const waitingRoom: TWaitingRoom | null = await WaitingRoom.findOne({ tournament: tournamentId });
    if (!waitingRoom) {
        const waitingRoom = await WaitingRoom.create({ tournament: tournamentId, users: [{ gameId: userId, userWalletAddress }] });
        return res.status(200).json({ success: true, waitingRoom });
    }

    if (!waitingRoom.users.some(user => user.gameId === userId)) {
        waitingRoom.users.push({ gameId: userId, userWalletAddress });
        await waitingRoom.save();
    }

    res.status(200).json({ success: true, waitingRoom });
});

export const isUserInWaitingRoom = catchAsyncError(async (req, res, next) => {

    const { tournamentId, userId, userWalletAddress } = req.query;
    if (!tournamentId || !userId || !userWalletAddress) {
        return next(new ErrorHandler('Please provide tournamentId and userId', 400));
    }
    const waitingRoom = await WaitingRoom.findOne({ tournament: tournamentId });
    if (!waitingRoom) {
        return res.status(200).json({ success: true, isUserInWaitingRoom: false });
    }
    if (!waitingRoom.users.some(user => user.gameId === userId)) {
        return res.status(200).json({ success: true, isUserInWaitingRoom: false });
    }
    res.status(200).json({ success: true, isUserInWaitingRoom: true });
});

export const getUserCount = catchAsyncError(async (req, res, next) => {

    const { tournamentId } = req.query;
    if (!tournamentId) {
        return next(new ErrorHandler('Please provide tournamentId', 400));
    }
    const waitingRoom = await WaitingRoom.findOne({ tournament: tournamentId });
    if (!waitingRoom) {
        return res.status(200).json({ success: true, userCount: 0 });
    }
    res.status(200).json({ success: true, userCount: waitingRoom.users.length });
}
);


