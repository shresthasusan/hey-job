import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

// Define User Schema
const userSchema = new mongoose.Schema({
  role: String, // Role can be "freelancersinfos", "users", or other values
});

// Prevent model re-compilation
const User = mongoose.models.User || mongoose.model("User", userSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments(); // Counts all users
    const freelancers = await User.countDocuments({ role: "freelancersinfos" }); // Count freelancers
    const clients = await User.countDocuments({ role: "users" }); // Count clients

    res.status(200).json({ totalUsers, freelancers, clients });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
