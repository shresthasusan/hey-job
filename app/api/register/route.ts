import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../models/user";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { createVerificationToken } from "@/app/lib/tokenGenerator";

interface UserRequestBody {
  email: string;
  name: string;
  lastName: string;
  password: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Hey Job!",
    html: `<p>Click the link below to verify your email:</p>
           <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent to:", email);
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, lastName, password }: UserRequestBody = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const existingUser = await User.findOne({ email }).select("_id");
    console.log(existingUser); // This will log the user to thes
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    await User.create({ email, name, lastName, password: hashedPassword });
    console.log("✅ User Created:", email);
    const token = await createVerificationToken(email) as string;
    console.log("✅ Verification Token Created:", token);
    await sendEmail(email, token);
    console.log("✅ Email Sent:", email);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}