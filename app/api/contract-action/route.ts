import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import Contract from "@/models/contract";

// Define the allowed status transitions type
type ContractStatus = "pending" | "active" | "declined" | "completed" | "canceled";

export async function PATCH(req: NextRequest) {
    try {
        await connectMongoDB();

        // Parse request data
        const { contractId, newStatus, userId } = await req.json();
        if (!contractId || !newStatus || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Find the contract
        const contract = await Contract.findById(contractId);
        if (!contract) {
            return NextResponse.json({ message: "Contract not found" }, { status: 404 });
        }

        // Check if the user is authorized (either client or freelancer)
        if (contract.clientId.toString() !== userId && contract.freelancerId.toString() !== userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // Allowed status transitions (typed as ContractStatus)
        const allowedTransitions: Record<ContractStatus, string[]> = {
            pending: ["active", "declined", "canceled"],
            active: ["completed", "canceled"],
            declined: [],
            completed: [],
            canceled: []
        };

        // TypeScript type checking
        if (!allowedTransitions[contract.status as ContractStatus].includes(newStatus)) {
            return NextResponse.json({ message: `Invalid status transition from ${contract.status} to ${newStatus}` }, { status: 400 });
        }

        // Update contract status
        contract.status = newStatus;
        contract.statusHistory.push({ status: newStatus, changedAt: new Date() });
        await contract.save();

        return NextResponse.json({ message: "Contract status updated successfully", contract }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
