import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import ProjectDetails from "@/models/projectDetails";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        // Extract contractId from query parameters
        const { searchParams } = new URL(req.url);
        const contractId = searchParams.get("contractId");

        if (!contractId) {
            return NextResponse.json({ message: "Missing contractId" }, { status: 400 });
        }

        // Find the project by contractId
        const project = await ProjectDetails.findOne({ contractId })
            .populate("jobId", "title description") // Optional: populate job details

        if (!project) {
            return NextResponse.json({ message: "Project not found for this contract" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project retrieved successfully", project }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectMongoDB();
        const userData = req.headers.get("user");
        const user = userData ? JSON.parse(userData) : null;
        const userId = user.id;
        const { contractId, updates } = await req.json();

        if (!contractId || !userId || !updates) {
            return NextResponse.json({ message: "Missing contractId, userId, or updates" }, { status: 400 });
        }

        const project = await ProjectDetails.findOne({ contractId });

        if (!project) {
            return NextResponse.json({ message: "Project not found for this contract" }, { status: 404 });
        }

        // Determine user role
        const isClient = project.clientId.toString() === userId;
        const isFreelancer = project.freelancerId.toString() === userId;

        // Client can update requirements
        if (isClient && "requirements" in updates) {
            if (Array.isArray(updates.requirements)) {
                project.requirements = updates.requirements;
            } else {
                return NextResponse.json({ message: "Requirements should be an array of strings." }, { status: 400 });
            }
        }

        // Freelancer can update project_todo, project_files, and deliveries
        if (isFreelancer) {
            if ("project_todo" in updates) {
                if (Array.isArray(updates.project_todo)) {
                    project.project_todo = updates.project_todo;
                } else {
                    return NextResponse.json({ message: "project_todo should be an array of objects." }, { status: 400 });
                }
            }

            if ("project_files" in updates) {
                if (Array.isArray(updates.project_files)) {
                    project.project_files = updates.project_files;
                } else {
                    return NextResponse.json({ message: "project_files should be an array of objects." }, { status: 400 });
                }
            }

            if ("deliveries" in updates) {
                if (Array.isArray(updates.deliveries)) {
                    project.deliveries = updates.deliveries;
                } else {
                    return NextResponse.json({ message: "deliveries should be an array of strings." }, { status: 400 });
                }
            }
        }

        // Both client and freelancer can schedule meetings
        if (isClient || isFreelancer) {
            if ("meetings" in updates) {
                if (Array.isArray(updates.meetings)) {
                    project.meetings = updates.meetings;
                } else {
                    return NextResponse.json({ message: "meetings should be an array of objects." }, { status: 400 });
                }
            }
        }

        project.updated_at = new Date();
        await project.save();

        return NextResponse.json({ message: "Project updated successfully", project }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}