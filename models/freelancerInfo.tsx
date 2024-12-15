import {
  institution,
  project,
  work,
} from "@/app/ui/login-signup-component/freelancer/freelancerForms";
import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface representing the FreelancerInfo document
interface IFreelancerInfo extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User's _id
  fullName: string;
  email: string;
  location: string;
  phone: string;
  skills: string[];
  workExperience: work[];
  projectPortfolio: project[];
  education: institution[];
  // certificate: string;
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
    email: {
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
      type: [String],
      required: true,
    },
    workExperience: [
      {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: String, required: false }, // e.g., "Jan 2020 - Dec 2021"
        endDate: { type: String, required: false },
      },
    ],
    projectPortfolio: [
      {
        projectTitle: { type: String, required: true },
        projectDescription: { type: String, required: false },
        technologies: { type: [String], required: false },
        portfolioFiles: { type: [String], required: false }, // URL to the project
      },
    ],

    education: [
      {
        degree: { type: String, required: false },
        institution: { type: String, required: true },
        startDate: { type: String, required: false },
        endDate: { type: String, required: false },
      },
    ],
    bio: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
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
