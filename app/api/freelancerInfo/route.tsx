import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest } from "next/server";
import FreelancerInfo from "@/models/freelancerInfo";

interface UserRequestBody {
  userId: string;
  fullName: string;
  professionalEmail: string;
  location: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  portfolio: string;
  certificate: string;
  bio: string;
  languages: string[];
  rate: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      fullName,
      professionalEmail,
      location,
      phone,
      skills,
      experience,
      education,
      portfolio,
      certificate,
      bio,
      languages,
      rate,
    }: UserRequestBody = await req.json();

    await connectMongoDB();
    // Save the data in the database
    await FreelancerInfo.create({
      userId,
      fullName,
      professionalEmail,
      location,
      phone,
      skills,
      experience,
      education,
      portfolio,
      certificate,
      bio,
      languages,
      rate,
    });
    const responseData = {
      userId,
      fullName,
      professionalEmail,
      location,
      phone,
      skills,
      experience,
      education,
      portfolio,
      certificate,
      bio,
      languages,
      rate,
    };

    return NextResponse.json(
      { message: "Data Received Successfully", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
