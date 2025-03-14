import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import ProjectDetails from "@/models/projectDetails";
import Jobs from "@/models/jobs";// Assuming this model exists
import Contract from "@/models/contract"; // Assuming this model exists

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(req.url);
        const contractId = searchParams.get("contractId");

        if (!contractId) {
            return NextResponse.json({ message: "Missing contractId" }, { status: 400 });
        }

        const project = await ProjectDetails.findOne({ contractId }).populate(
            "jobId",
            "title description"
        );

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
        const userId = user?.id;
        const { contractId, updates } = await req.json();

        if (!contractId || !userId || !updates) {
            return NextResponse.json({ message: "Missing contractId, userId, or updates" }, { status: 400 });
        }

        // Find the project by contractId
        const project = await ProjectDetails.findOne({ contractId });
        if (!project) {
            return NextResponse.json({ message: "Project not found for this contract" }, { status: 404 });
        }

        // Determine user role
        const isClient = project.clientId.toString() === userId;
        const isFreelancer = project.freelancerId.toString() === userId;

        if (!isClient && !isFreelancer) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // Handle existing updates (requirements, project_todo, etc.)
        if (isClient && "requirements" in updates) {
            if (Array.isArray(updates.requirements)) {
                project.requirements = updates.requirements;
            } else {
                return NextResponse.json(
                    { message: "Requirements should be an array of strings." },
                    { status: 400 }
                );
            }
        }

        if (isFreelancer) {
            if ("project_todo" in updates) {
                if (Array.isArray(updates.project_todo)) {
                    project.project_todo = updates.project_todo;
                } else {
                    return NextResponse.json(
                        { message: "project_todo should be an array of objects." },
                        { status: 400 }
                    );
                }
            }

            if ("project_files" in updates) {
                if (Array.isArray(updates.project_files)) {
                    project.project_files = updates.project_files;
                } else {
                    return NextResponse.json(
                        { message: "project_files should be an array of objects." },
                        { status: 400 }
                    );
                }
            }

            if ("deliveries" in updates) {
                if (Array.isArray(updates.deliveries)) {
                    project.deliveries = updates.deliveries;
                } else {
                    return NextResponse.json(
                        { message: "deliveries should be an array of strings." },
                        { status: 400 }
                    );
                }
            }
        }

        if (isClient || isFreelancer) {
            if ("meetings" in updates) {
                if (Array.isArray(updates.meetings)) {
                    project.meetings = updates.meetings;
                } else {
                    return NextResponse.json(
                        { message: "meetings should be an array of objects." },
                        { status: 400 }
                    );
                }
            }
        }

        // Handle completed or canceled status updates
        if ("status" in updates) {
            const newStatus = updates.status;
            if (!["completed", "canceled"].includes(newStatus)) {
                return NextResponse.json(
                    { message: "Status must be 'completed' or 'canceled'" },
                    { status: 400 }
                );
            }

            // Authorization: Freelancer can mark as completed, either can cancel
            if (newStatus === "completed" && !isFreelancer) {
                return NextResponse.json(
                    { message: "Only the freelancer can mark the project as completed" },
                    { status: 403 }
                );
            }

            // Update ProjectDetails
            project.status = newStatus;
            project.updated_at = new Date();

            // Update Job
            const job = await Jobs.findById(project.jobId);
            if (!job) {
                return NextResponse.json({ message: "Associated job not found" }, { status: 404 });
            }
            job.status = newStatus === "completed" ? "completed" : "canceled";

            // Push to Job statusHistory
            job.statusHistory = job.statusHistory || [];
            job.statusHistory.push({
                status: newStatus,
                changedAt: new Date(),
            });

            // Update Contract
            const contract = await Contract.findOne({ _id: contractId });
            if (!contract) {
                return NextResponse.json({ message: "Contract not found" }, { status: 404 });
            }
            contract.status = newStatus === "completed" ? "completed" : "canceled";
            contract.updated_at = new Date();

            // Push to Contract statusHistory
            contract.statusHistory = contract.statusHistory || [];
            contract.statusHistory.push({
                status: newStatus,
                updatedBy: userId,
                updatedAt: new Date(),
            });

            // Save all changes
            await Promise.all([project.save(), job.save(), contract.save()]);
        } else {
            // If no status update, save only project changes
            project.updated_at = new Date();
            await project.save();
        }

        return NextResponse.json({ message: "Project updated successfully", project }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}