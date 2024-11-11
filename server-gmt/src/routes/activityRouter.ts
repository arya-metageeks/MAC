import express from 'express';
import {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity
} from '../controller/activityController';

const activityRouter = express.Router();

activityRouter.post('/', createActivity);
activityRouter.get('/', getAllActivities);
activityRouter.get('/:id', getActivityById);
activityRouter.put('/:id', updateActivity);
activityRouter.delete('/:id', deleteActivity);

export default activityRouter;
