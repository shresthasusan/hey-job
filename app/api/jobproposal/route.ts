import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import Proposal from "@/models/proposal";

export async function GET(req: NextRequest) {
    await connectMongoDB();

    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId"); // Job ID parameter

        // Define filter condition
        const filter: any = {};

        // Add jobId filter if provided
        if (jobId) {
            filter.jobId = jobId;
        }

        // Fetch proposals based on filter
        const proposals = await Proposal.find(filter);

        console.log("Proposals fetched successfully", { jobId });
        return NextResponse.json({ proposals }, { status: 200 });

    } catch (error) {
        console.error("Error fetching proposals:", error);
        return NextResponse.json({ message: "Error fetching proposals" }, { status: 500 });
    }
}