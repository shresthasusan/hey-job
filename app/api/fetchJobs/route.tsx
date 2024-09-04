import Jobs from "@/models/jobs";
import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const jobs = await Jobs.find();
    console.log("Jobs details fetched successfully");
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}
