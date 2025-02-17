import { NextRequest, NextResponse } from "next/server";
import KYC from "@/models/kyc";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
    await connectMongoDB();

    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status"); // e.g., "approved", "rejected", "pending"

        // Define filter condition
        const filter = status && ["approved", "rejected", "pending"].includes(status)
            ? { status }
            : {};

        // Fetch KYC data based on filter
        const kycs = await KYC.find(filter);

        console.log("KYC data fetched successfully", { status });
        return NextResponse.json(kycs, { status: 200 });

    } catch (error) {
        console.error("Error fetching KYC data:", error);
        return NextResponse.json({ message: "Error fetching KYC data" }, { status: 500 });
    }
}
