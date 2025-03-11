import Jobs from "@/models/jobs";
import SavedJobs from "@/models/savedJobs"; // Import SavedJobs model
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import proposal from "@/models/proposal";
import FreelancerInfo from "@/models/freelancerInfo";
import { industrySkillsMapping } from "@/app/lib/data";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const bestMatches = searchParams.get('bestMatches');
  const mostRecent = searchParams.get('mostRecent');
  const savedJobs = searchParams.get('savedJobs');
  const title = searchParams.get('title');
  const experience = searchParams.get('Experience');
  const jobId = searchParams.get('jobId');
  const clientId = searchParams.get('userId'); // Get userId from query parameters

  const userId = session?.user.id;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let jobs: any[] = [];

  try {
    await connectMongoDB();

    if (jobId) {
      // Fetch individual job with proposal count
      const job = await Jobs.findById(jobId);
      if (!job) {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }

      const proposalCount = await proposal.countDocuments({ jobId });

      return NextResponse.json({ ...job.toObject(), proposalCount });
    }

    if (clientId) {
      // Fetch all jobs posted by the client
      const jobs = await Jobs.find({ userId: session?.user.id });

      // Enrich jobs with proposal count
      const jobsWithProposalCounts = await Promise.all(
        jobs.map(async (job) => {
          const proposalCount = await proposal.countDocuments({ jobId: job._id });
          return { ...job.toObject(), proposalCount };
        })
      );

      // Return a single object instead of an array
      return NextResponse.json({ jobs: jobsWithProposalCounts });
    }

    // Fetch jobs based on query parameters
    if (!title) {
      if (bestMatches) {
        // Fetch freelancer info to get their skills
        const freelancerInfo = await FreelancerInfo.findOne({ userId }).select("skills");
        const freelancerSkills = freelancerInfo?.skills || [];

        // Fetch jobs that match the freelancer's skills and exclude jobs posted by the user
        const recommendedJobs = await Jobs.find({
          tags: { $in: freelancerSkills }, // Match job tags with freelancer skills
          userId: { $ne: userId }, // Exclude jobs posted by the user
          status: 'active'
        });

        // Fetch other jobs excluding recommended ones and jobs posted by the user
        const recommendedJobIds = recommendedJobs.map(job => job._id);
        const otherJobs = await Jobs.find({
          _id: { $nin: recommendedJobIds },
          userId: { $ne: userId }, // Exclude jobs posted by the user
          status: 'active'
        });

        // Combine recommended and other jobs
        jobs = [...recommendedJobs, ...otherJobs];
      } else if (mostRecent) {
        jobs = await Jobs.find({
          userId: { $ne: userId },
          status: 'active'
        }).sort({ createdAt: -1 }); // Sort by most recent
      } else if (savedJobs) {
        // Fetch jobs saved by the user from SavedJobs collection
        const savedJobsData = await SavedJobs.find({ userId }).populate('jobId');
        jobs = savedJobsData ? savedJobsData.map((savedJob) => savedJob.jobId) : [];
      }
    } else if (!experience) {
      // Fetch jobs where 'title' matches the search parameter
      jobs = await Jobs.find({
        userId: { $ne: userId },
        title: { $regex: title, $options: "i" },
      });
    } else {
      // Fetch jobs where 'title' and 'experience' match the search parameters
      jobs = await Jobs.find({
        userId: { $ne: userId },
        title: { $regex: title, $options: "i" },
      })
        .where('experience').in(experience.split(','));
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