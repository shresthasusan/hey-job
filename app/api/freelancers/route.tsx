import { authOptions } from "@/app/lib/auth";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const userId = session.user.id; // Get the logged-in user's ID from session

    // Fetch all freelancers excluding the logged-in user
    const freelancers = await FreelancerInfo.find({ userId: { $ne: userId } });

    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error("Error fetching FreelancerInfo:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}
