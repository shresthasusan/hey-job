import User from "@/models/user";
import { connectMongoDB } from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import FreelancerInfo from "@/models/freelancerInfo";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();

        // Fetch user data
        const user = await User.findById(id).select(
            "profilePicture email roles createdAt city country phone zipPostalCode"
        );

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Fetch freelancer info
        const freelancerInfo = await FreelancerInfo.findOne({ userId: id }).select(
            "workExperience fullName projectPortfolio skills education bio languages rate"
        );

        // Combine both user and freelancerInfo into a flat JSON object
        const combinedData = {
            ...user.toObject(), // Destructure user fields
            ...freelancerInfo?.toObject(), // Destructure freelancer fields (if exists)
        };

        return NextResponse.json(combinedData, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
    }
}
