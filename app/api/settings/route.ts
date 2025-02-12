import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

// User Schema
const userSchema = new mongoose.Schema({
  role: { type: String, default: "user" }, // "admin", "freelancer", "client"
  notifications: { type: Boolean, default: true },
});

const settingsSchema = new mongoose.Schema({
  maintenanceMode: { type: Boolean, default: false },
});

// Prevent duplicate model compilation
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const settings = await Settings.findOne() || new Settings();
      res.status(200).json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } 
  else if (req.method === "PUT") {
    const { maintenanceMode, notifications, userId, role } = req.body;

    try {
      if (maintenanceMode !== undefined) {
        await Settings.updateOne({}, { maintenanceMode }, { upsert: true });
      }

      if (notifications !== undefined) {
        await User.findByIdAndUpdate(userId, { notifications });
      }

      if (role) {
        await User.findByIdAndUpdate(userId, { role });
      }

      res.status(200).json({ message: "Settings updated successfully!" });
    } catch (error) {
      console.error("Error updating settings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
