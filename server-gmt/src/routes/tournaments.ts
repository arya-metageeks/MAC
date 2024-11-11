import express, { Request, Response } from 'express';
import { createTournament, getTournament, getTournaments, addWinners, updateTournament } from '../controller/tournamentController';
const tournamentRouter = express.Router();

tournamentRouter.route('/').post(createTournament).get(getTournaments);
tournamentRouter.get('/getDate', (req: Request, res: Response) => {
    const date = new Date();
    res.json({ date });
}
);
tournamentRouter.get('/getTournaments', getTournaments);
tournamentRouter.patch('/:id', updateTournament);

tournamentRouter.route('/:id').get(getTournament).patch(addWinners);


export default tournamentRouter;
