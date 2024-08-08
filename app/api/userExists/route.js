import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email }).select("_id");
    console.log(user); // This will log the user to thes
    return NextResponse.json({ user });
    // if (user) {
    //     return NextResponse.json({ message: "User exists" }, { status: 200 });
    // }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
