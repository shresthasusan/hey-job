"use server";

import { connectMongoDB } from "@/app/lib/mongodb";
import Payment from "@/models/payment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const type = url.searchParams.get("type") || "month"; // Default to month-wise aggregation

        let groupBy;
        if (type === "day") {
            groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        } else if (type === "month") {
            groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        } else if (type === "year") {
            groupBy = { $dateToString: { format: "%Y", date: "$createdAt" } };
        } else {
            return NextResponse.json({ success: false, message: "Invalid type parameter" }, { status: 400 });
        }

        const topSpenders = await Payment.aggregate([
            {
                $group: {
                    _id: "$clientId",
                    totalSpent: { $sum: "$totalAmount" }
                }
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 10 }
        ]);

        const topEarners = await Payment.aggregate([
            {
                $group: {
                    _id: "$freelancerId",
                    totalEarned: { $sum: "$freelancerAmount" }
                }
            },
            { $sort: { totalEarned: -1 } },
            { $limit: 10 }
        ]);

        return NextResponse.json({ success: true, data: { topSpenders, topEarners } });
    } catch (error) {
        console.error("Error fetching financial statistics:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}