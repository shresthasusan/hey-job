import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import KYC from "@/models/kyc";

type KYCGrowthResponse = {
    date: string;
    submittedKYC: number;
    rejected: number;
    approved: number;
}[];

// Convert month number to name
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export async function GET(
    req: NextRequest,
    res: NextResponse<KYCGrowthResponse | { error: string }>
) {
    await connectMongoDB();

    try {
        // Get timeframe from query params (default: "daily")
        const timeframe = req.nextUrl.searchParams.get("timeframe") || "daily";

        let groupByCreatedAt: any = {};
        let groupByUpdatedAt: any = {};
        let dateFormatter: (d: any) => string;

        if (timeframe === "daily") {
            groupByCreatedAt = { $dateToString: { format: "%m-%d", date: "$createdAt" } };
            groupByUpdatedAt = { $dateToString: { format: "%m-%d", date: "$updatedAt" } };
            dateFormatter = (d: any) => d._id; // Format YYYY-MM-DD
        } else if (timeframe === "yearly") {
            groupByCreatedAt = { $year: "$createdAt" };
            groupByUpdatedAt = { $year: "$updatedAt" };
            dateFormatter = (d: any) => `Year ${d._id}`;
        } else {
            groupByCreatedAt = { $month: "$createdAt" };
            groupByUpdatedAt = { $month: "$updatedAt" };
            dateFormatter = (d: any) => monthNames[d._id - 1]; // Convert month index
        }

        // Aggregate total KYC submissions (grouped by createdAt)
        const submittedKYC = await KYC.aggregate([
            { $group: { _id: groupByCreatedAt, submittedKYC: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);

        // Aggregate rejected KYC (grouped by updatedAt)
        const rejectedKYC = await KYC.aggregate([
            { $match: { status: "rejected" } },
            { $group: { _id: groupByUpdatedAt, totalRejected: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);

        // Aggregate approved KYC (grouped by updatedAt)
        const approvedKYC = await KYC.aggregate([
            { $match: { status: "approved" } },
            { $group: { _id: groupByUpdatedAt, totalApproved: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);

        // Merge all data based on date
        const allDates = new Set([
            ...submittedKYC.map(d => d._id),
            ...rejectedKYC.map(d => d._id),
            ...approvedKYC.map(d => d._id)
        ]);

        const mergedData = Array.from(allDates).sort().map(date => {
            const submittedData = submittedKYC.find(d => d._id === date) || { submittedKYC: 0 };
            const rejectedData = rejectedKYC.find(d => d._id === date) || { totalRejected: 0 };
            const approvedData = approvedKYC.find(d => d._id === date) || { totalApproved: 0 };

            return {
                date: dateFormatter({ _id: date }),
                submittedKYC: submittedData.submittedKYC,
                rejected: rejectedData.totalRejected,
                approved: approvedData.totalApproved
            };
        });

        return NextResponse.json(mergedData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching user growth data" }, { status: 500 });
    }
}
