import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest } from "next/server";
import FreelancerInfo from "@/models/freelancerInfo";
import User from "@/models/user";
import { institution, project, work } from "@/app/ui/login-signup-component/freelancer/freelancerForms";

interface UserRequestBody {
  userId: string;
  fullName: string;
  email: string;
  location: string;
  phone: string;
  skills: string[];
  workExperience: work[];
  projectPortfolio: project[];
  education: institution[];
  bio: string;
  languages: string[];
  rate: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      fullName,
      email,
      location,
      phone,
      skills,
      workExperience,
      projectPortfolio,
      education,
      bio,
      languages,
      rate,
    }: UserRequestBody = await req.json();

    await connectMongoDB();
    // Save the data in the database
    await FreelancerInfo.create({
      userId,
      fullName,
      email,
      location,
      phone,
      skills,
      workExperience,
      projectPortfolio,
      education,
      bio,
      languages,
      rate,
    });
    await User.updateOne({ _id: userId }, { $set: { "roles.freelancer": true } });
    const responseData = {
      userId,
      fullName,
      email,
      location,
      phone,
      skills,
      workExperience,
      projectPortfolio,
      education,
      bio,
      languages,
      rate,
    };

    return NextResponse.json(
      { message: "Data Received Successfully", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
