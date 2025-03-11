import { authOptions } from "@/app/lib/auth";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import SavedFreelancers from "@/models/savedFreelancers";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const bestMatches = searchParams.get("bestMatches");
  const savedFreelancers = searchParams.get("savedFreelancers");
  const params = searchParams.get("talentName");
  const individualUserId = searchParams.get("userId"); // New parameter for individual freelancer

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Get the logged-in user's ID
  let freelancers: any[] = [];

  try {
    await connectMongoDB();

    if (individualUserId) {
      // Fetch individual freelancer data by userId
      const freelancer = await FreelancerInfo.findOne({ userId: individualUserId });
      if (freelancer) {
        const user = await User.findOne({ _id: freelancer.userId });
        const freelancerWithDetails = {
          freelancerId: freelancer._id, // Include freelancer ID
          ...freelancer.toObject(),    // Include freelancer details
          saved: false,                // Default to false for individual fetch
          profilePicture: user?.profilePicture || "/images/avatar.png", // Include profile picture
        };
        return NextResponse.json({ freelancer: freelancerWithDetails });
      } else {
        return NextResponse.json({ message: "Freelancer not found" }, { status: 404 });
      }
    }

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

    // Add 'saved' field and 'profilePicture' to each freelancer and include freelancerId
    const freelancersWithSavedFlag = await Promise.all(
      freelancers.map(async (freelancer) => {
        const user = await User.findOne({ _id: freelancer.userId });
        return {
          freelancerId: freelancer._id, // Include freelancer ID
          ...freelancer._doc,          // Include freelancer details
          saved: savedFreelancerIds.includes(freelancer.userId.toString()), // Check if saved
          profilePicture: user?.profilePicture || "/images/avatar.png", // Include profile picture
        };
      })
    );

    return NextResponse.json({ freelancers: freelancersWithSavedFlag });
  } catch (error) {
    console.error("Error fetching Freelancers:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 }
    );
  }
}