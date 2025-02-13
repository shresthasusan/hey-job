import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectMongoDB();
    const existingUser = await User.findOne({ email }).select("_id");
    console.log(existingUser); // This will log the user to thes
    if (existingUser) {
      return NextResponse.json({ message: "User exists" }, { status: 200 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
