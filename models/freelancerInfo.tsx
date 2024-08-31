import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface representing the FreelancerInfo document
interface IFreelancerInfo extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User's _id
  fullName: string;
  professionalEmail: string;
  location: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  portfolio: string;
  certificate: string;
  bio: string;
  languages: string[];
  rate: string;
}

// Define the FreelancerInfo schema
const freelancerInfoSchema = new Schema<IFreelancerInfo>(
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
    professionalEmail: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: false,
    },
    certificate: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: true,
    },
    languages: {
      type: [String], // Array of strings
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model for FreelancerInfo
const FreelancerInfo: Model<IFreelancerInfo> =
  mongoose.models.FreelancerInfo ||
  mongoose.model<IFreelancerInfo>("FreelancerInfo", freelancerInfoSchema);

export default FreelancerInfo;
