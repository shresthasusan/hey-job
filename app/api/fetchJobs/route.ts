import Jobs from "@/models/jobs";
import SavedJobs from "@/models/savedJobs"; // Import SavedJobs model
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const bestMatches = searchParams.get('bestMatches');
  const mostRecent = searchParams.get('mostRecent');
  const savedJobs = searchParams.get('savedJobs');
  const params = searchParams.get('query');

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;  // Get the logged-in user's ID from the session
  let jobs: any[] = [];

  try {
    await connectMongoDB();

    // Fetch jobs based on query parameters
    if (!params) {
      if (bestMatches) {
        jobs = await Jobs.find({
          userId: { $ne: userId },
        });
      } else if (mostRecent) {
        jobs = await Jobs.find({
          userId: { $ne: userId },
        }).sort({ createdAt: -1 }); // Sort by most recent
      } else if (savedJobs) {
        // Fetch jobs saved by the user from SavedJobs collection
        const savedJobsData = await SavedJobs.find({ userId }).populate('jobId');
        jobs = savedJobsData ? savedJobsData.map((savedJob) => savedJob.jobId) : [];
      }
    } else {
      // Fetch jobs where 'title' matches the search parameter
      jobs = await Jobs.find({
        userId: { $ne: userId },
        title: { $regex: params, $options: "i" },  // Case-insensitive matching on 'title'
      });
    }

    // Fetch saved job ids for the current user
    const savedJobRecords = await SavedJobs.find({ userId });
    const savedJobIds = savedJobRecords.map((record) => record.jobId.toString());

    // Add 'saved' field and include jobId for each job
    const jobsWithSavedFlag = jobs.map(job => ({
      jobId: job._id,  // Include the job ID in the response
      ...job._doc,     // Spread other job details
      saved: savedJobIds.includes(job._id.toString()), // Check if the job is saved
    }));

    return NextResponse.json({ jobs: jobsWithSavedFlag });
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}
