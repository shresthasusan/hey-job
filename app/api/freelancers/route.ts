import { authOptions } from "@/app/lib/auth";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import SavedFreelancers from "@/models/savedFreelancers";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const bestMatches = searchParams.get('bestMatches');
  const savedFreelancers = searchParams.get('savedFreelancers');
  const params = searchParams.get('talentName');

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;  // Get the logged-in user's ID from the session
  let freelancers: any[] = [];

  try {
    await connectMongoDB();

    // Fetch freelancers based on query parameters
    if (!params) {
      if (bestMatches) {
        freelancers = await FreelancerInfo.find({
          userId: { $ne: userId },
        });

      } else if (savedFreelancers) {
        // Fetch freelancers saved by the user from SavedFreelancers collection
        const savedFreelancersData = await SavedFreelancers.find({ userId }).populate('freelancerId');
        freelancers = savedFreelancersData ? savedFreelancersData.map((savedFreelancer) => savedFreelancer.freelancerId) : [];
      }
    } else {
      // Fetch freelancers where 'fullName' matches the search parameter

      freelancers = await FreelancerInfo.find({
        userId: { $ne: userId },
        fullName: { $regex: params, $options: "i" },  // Case-insensitive matching on 'fullName'
      });
    }

    // Fetch saved freelancer ids for the current user
    const savedFreelancerRecords = await SavedFreelancers.find({ userId });
    const savedFreelancerIds = savedFreelancerRecords.map((record) => record.freelancerId.toString());

    // Add 'saved' field and include freelancerId for each freelancer
    const freelancersWithSavedFlag = freelancers.map(freelancer => ({
      freelancerId: freelancer._id,  // Include the freelancer ID in the response
      ...freelancer._doc,     // Spread other freelancer details
      saved: savedFreelancerIds.includes(freelancer._id.toString()), // Check if the freelancer is saved
    }));

    return NextResponse.json({ freelancers: freelancersWithSavedFlag });
  } catch (error) {
    console.error("Error fetching Freelancers:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 },

    );
  }
}