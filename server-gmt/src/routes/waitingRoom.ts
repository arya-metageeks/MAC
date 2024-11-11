import express, { Request, Response } from 'express';
import { addToWaitingRoom, isUserInWaitingRoom, getUserCount } from '../controller/waitingRoom';
const waitingRoomRouter = express.Router();

waitingRoomRouter.route('/').post(addToWaitingRoom).get(isUserInWaitingRoom);
waitingRoomRouter.get('/getUserCount', getUserCount)

export default waitingRoomRouter;
