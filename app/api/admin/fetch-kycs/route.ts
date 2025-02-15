import { NextRequest, NextResponse } from "next/server";
import KYC from "@/models/kyc";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
    await connectMongoDB();

    try {
        const kycs = await KYC.find({});
        console.log("KYC data fetched successfully");
        return NextResponse.json(kycs, { status: 200 });
    } catch (error) {
        console.error("Error fetching KYC data:", error);
        return NextResponse.json({ message: "Error fetching KYC data" }, { status: 500 });
    }
}