import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { NextResponse } from "next/server";

export async function GET(res: NextApiResponse) {
  try {
    await connectMongoDB();
    const freelancers = await FreelancerInfo.find();
    console.log("Freelancers details fetched successfully");
    return NextResponse.json({ freelancers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching freelancers" });
  }
}
