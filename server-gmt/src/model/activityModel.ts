import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the activity document
interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    userName: string;
    activity: 'added to cart' | 'bought kol';
    onKol: mongoose.Types.ObjectId;
    kolName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the activity schema
const activitySchema = new Schema<IActivity>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    activity: { type: String, enum: ['added to cart', 'bought kol'], required: true },
    onKol: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    kolName: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

// Create a model
const activityModel = mongoose.model<IActivity>('Activity', activitySchema);

export default activityModel;
    