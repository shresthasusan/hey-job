import { NextRequest, NextResponse } from "next/server";
import Contract from "@/models/contract";
import Proposal from "@/models/proposal";
import { connectMongoDB } from "@/app/lib/mongodb";


export async function POST(req: NextRequest) {
    try {
        // Ensure database connection
        await connectMongoDB();

        const userData = req.headers.get("user");
        console.log("Raw userData from headers:", userData); // Debugging step

        if (!userData) {
            return NextResponse.json({ message: "User data is missing in headers" }, { status: 400 });
        }

        let user;
        try {
            user = JSON.parse(userData);
            console.log("Parsed user object:", user); // Debugging step
        } catch (error) {
            return NextResponse.json({ message: "Invalid user data format" }, { status: 400 });
        }

        if (!user || typeof user !== "object") {
            return NextResponse.json({ message: "User data is missing or invalid" }, { status: 400 });
        }

        if (!user.emailVerified || !user.kycVerified) {
            const notVerified = [];
            if (!user.emailVerified) {
                console.log("Email Verified:", user.emailVerified); // Debugging
                notVerified.push("email");
            }
            if (!user.kycVerified) notVerified.push("KYC");

            return NextResponse.json({ message: `Unauthorized: ${notVerified.join(" and ")} not verified` }, { status: 400 });
        }

        // Parse request body
        const { jobId, freelancerId, bidAmount, deadline, pricingType, expiration } = await req.json();

        // Validate required fields
        if (![jobId, freelancerId, bidAmount, deadline].every(Boolean)) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Convert & validate data types
        const price = Number(bidAmount);
        const deadlineDate = new Date(deadline);
        const expirationDate = expiration ? new Date(expiration) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default: 7 days

        if (isNaN(price) || price <= 0) {
            return NextResponse.json({ message: "Invalid bid amount" }, { status: 400 });
        }
        if (isNaN(deadlineDate.getTime())) {
            return NextResponse.json({ message: "Invalid deadline" }, { status: 400 });
        }

        // Check for existing Contract
        if (await Contract.exists({ jobId, freelancerId })) {
            return NextResponse.json({ message: "An Offer already exists for this job and freelancer" }, { status: 409 });
        }
        // Update proposal status to "accepted" and add to status history
        const updatedProposal = await Proposal.findOneAndUpdate(
            { jobId, userId: freelancerId },
            {
                status: "accepted",
                $push: {
                    statusHistory: {
                        status: "accepted",
                        changedAt: new Date()
                    }
                }
            },
            { new: true }
        );

        if (!updatedProposal) {
            return NextResponse.json({ message: "Proposal not found" }, { status: 404 });
        }

        // Create and save the Contract
        const newContract = await Contract.create({
            jobId: jobId,
            freelancerId: freelancerId,
            clientId: user.id,
            paymentType: pricingType || "fixed",
            price,
            deadline: deadlineDate,
            expiration: expirationDate,
            status: "pending",
        });

        return NextResponse.json({ message: "Offer submitted successfully", Contract: newContract }, { status: 201 });
    } catch (error) {
        console.error("Error submitting Contract:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
