import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    const { email, name, lastName, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ email, name, lastName, password: hashedPassword });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
