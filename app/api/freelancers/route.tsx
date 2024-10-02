import { authOptions } from "@/app/lib/auth";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract query parameters from the URL
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  try {
    await connectMongoDB();
    const userId = session.user.id; // Get the logged-in user's ID from session

    let freelancers;
    if (!query) {
      // Fetch all freelancers excluding the logged-in user
      freelancers = await FreelancerInfo.find({
        userId: { $ne: userId },
      });
    } else {
      // Fetch freelancers based on the search query
      freelancers = await FreelancerInfo.find({
        userId: { $ne: userId },
        $or: [
          { fullName: { $regex: query, $options: "i" } },
          { skills: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
        ],
      });
    }
    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error("Error fetching FreelancerInfo:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 }
    );
  }
}
