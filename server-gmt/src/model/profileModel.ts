import mongoose, { Schema, Document } from "mongoose";
import { Tprofile } from "../types/profile";

const socialMediaCountSchema = new Schema({
  platform: {
    type: String,
    enum: ['instagram', 'telegram', 'youtube', 'x', 'tiktok'],  // Updated to match UI channels
    required: true
  },
  followers: {
    type: Number,
    default: 0
  }
});

const profileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,  // Changed to Number for range filtering
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  // New fields to match filter requirements
  language: {
    type: [String],
    required: true,
    enum: [
      "English", "French", "Spanish", "German", "Russian", "Portuguese",
      "Hindi", "Turkish", "Filipino", "Indonesian", "Vietnamese", "Arabic",
      "Chinese", "Korean", "Japanese", "Thai", "Pakistan", "Italian",
      "Ukrainian", "Urdu", "Other"
    ]
  },
  area: {
    type: String,
    required: true,
    enum: [
      "Europe", "Asia", "Southeast Asia", "South Asia", "Africa",
      "North and Latin America", "CIS", "Other"
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  socialMedia: [socialMediaCountSchema],
  description: {
    type: String,
    required: true,
    trim: true
  },
  banner: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  _v: false
});

// Add indexes for frequently filtered fields
profileSchema.index({ language: 1 });
profileSchema.index({ area: 1 });
profileSchema.index({ price: 1 });
profileSchema.index({ 'socialMedia.platform': 1 });

const ProfileModel = mongoose.model('Profile', profileSchema);

export default ProfileModel;