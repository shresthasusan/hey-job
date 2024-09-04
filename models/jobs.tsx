import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface representing the FreelancerInfo document
interface IJobs extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User's _id
  fullName: string;
  title: string;
  type: string;
  experience: string;
  budget: string;
  description: string;
  tags: string[];
  location: string;
}

// Define the FreelancerInfo schema
const jobsSchema = new Schema<IJobs>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure each user has only one FreelancerInfo document
    },
    fullName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Array of strings
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model for FreelancerInfo
const Jobs: Model<IJobs> =
  mongoose.models.Jobs || mongoose.model<IJobs>("Jobs", jobsSchema);

export default Jobs;
