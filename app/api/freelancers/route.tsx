import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const freelancers = await FreelancerInfo.find();
    console.log("Freelancers details fetched successfully");
    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 }
    );
  }
}
