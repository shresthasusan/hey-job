import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["deposit", "withdrawal", "payment"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], required: true },
  timestamp: { type: Date, default: Date.now },
});

// Prevent duplicate model compilation
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const transactions = await Transaction.find().populate("userId", "name role");
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
