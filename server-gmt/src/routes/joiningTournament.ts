import express, { Request, Response } from 'express';
import {joiningTournament} from '../controller/joiner';
const joiningTournamentRouter = express.Router();

joiningTournamentRouter.post( '/', joiningTournament );


export default joiningTournamentRouter;
