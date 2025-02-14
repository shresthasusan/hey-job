import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";

export async function GET({ params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    await connectMongoDB();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select(
      "emailVerified kycVerified"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      emailVerified: user.emailVerified,
      kycVerified: user.kycVerified,
    });
  } catch (error) {
    console.error("Error fetching verification status:", error);
    return NextResponse.json(
      { message: "Error fetching verification status" },
      { status: 500 }
    );
  }
}
