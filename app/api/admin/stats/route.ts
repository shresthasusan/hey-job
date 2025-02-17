import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../models/user";





export async function GET() {
  try {
    await connectMongoDB();

    const totalUsers = await User.countDocuments();
    const freelancers = await User.countDocuments({ "roles.freelancer": true });
    const clients = await User.countDocuments({ "roles.client": true });

    console.log("Total users:", totalUsers, "Freelancers:", freelancers, "Clients:", clients);

    return NextResponse.json({ totalUsers, freelancers, clients });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
