import Jobs from "@/models/jobs";
import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const userId = session.user.id; // Get the logged-in user's ID from session

    // Fetch all freelancers excluding the logged-in user
    const jobs = await Jobs.find({ userId: { $ne: userId } });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}
