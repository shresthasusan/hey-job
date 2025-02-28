import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    await connectMongoDB();

    try {
        const userGrowth = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        return NextResponse.json(userGrowth, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user growth data" }, { status: 500 });
    }
}
