import { Request, Response } from 'express';
import activityModel from '../model/activityModel';

// Create a new activity
export const createActivity = async (req: Request, res: Response) => {
    try {
        const { userId, userName, activity, onKol, kolName } = req.body;

        const newActivity = new activityModel({
            userId,
            userName,
            activity,
            onKol,
            kolName,
        });

        await newActivity.save();
        return res.status(201).json(newActivity);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get all activities
export const getAllActivities = async (req: Request, res: Response) => {
    try {
        const activities = await activityModel.find().populate('userId onKol');
        return res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific activity by ID
export const getActivityById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const activity = await activityModel.findById(id).populate('userId onKol');

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        return res.status(200).json(activity);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update an activity by ID
export const updateActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedActivity = await activityModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        return res.status(200).json(updatedActivity);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an activity by ID
export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedActivity = await activityModel.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        return res.status(204).json(); // No content to send back
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
