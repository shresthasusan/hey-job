import { authOptions } from "@/app/lib/auth";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import SavedFreelancers from "@/models/savedFreelancers";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const bestMatches = searchParams.get("bestMatches");
  const savedFreelancers = searchParams.get("savedFreelancers");
  const params = searchParams.get("talentName");

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Get the logged-in user's ID
  let freelancers: any[] = [];

  try {
    await connectMongoDB();

    if (!params) {
      if (bestMatches) {
        // Fetch best match freelancers excluding current user
        freelancers = await FreelancerInfo.find({ userId: { $ne: userId } });
      } else if (savedFreelancers) {
        // Fetch saved freelancer IDs from SavedFreelancers collection
        const savedFreelancersData = await SavedFreelancers.find({ userId });

        // Extract freelancer IDs and fetch their details from FreelancerInfo
        const savedFreelancerIds = savedFreelancersData.map((record) => record.freelancerId);
        freelancers = await FreelancerInfo.find({ userId: { $in: savedFreelancerIds } });

      }
    } else {
      // Fetch freelancers matching the search parameter
      freelancers = await FreelancerInfo.find({
        userId: { $ne: userId },
        fullName: { $regex: params, $options: "i" }, // Case-insensitive search
      });
    }

    // Fetch saved freelancer IDs for the current user
    const savedFreelancerRecords = await SavedFreelancers.find({ userId });
    const savedFreelancerIds = savedFreelancerRecords.map((record) => record.freelancerId.toString());

    // Add 'saved' field to each freelancer and include freelancerId
    const freelancersWithSavedFlag = freelancers.map((freelancer) => ({
      freelancerId: freelancer._id, // Include freelancer ID
      ...freelancer._doc,          // Include freelancer details
      saved: savedFreelancerIds.includes(freelancer.userId.toString()), // Check if saved

    }));

    return NextResponse.json({ freelancers: freelancersWithSavedFlag });
  } catch (error) {
    console.error("Error fetching Freelancers:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 }
    );
  }
}
