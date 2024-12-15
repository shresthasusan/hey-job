import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest } from "next/server";
import Jobs from "@/models/jobs";

interface RequestBody {
  userId: string;
  fullName: string;
  title: string;
  type: string;
  experience: string;
  budget: string;
  description: string;
  tags: string[];
  location: string;
  fileUrls: string[];
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      fullName,
      title,
      type,
      experience,
      budget,
      description,
      tags,
      location,
      fileUrls,
    }: RequestBody = await req.json();

    await connectMongoDB();
    // Save the data in the database
    await Jobs.create({
      userId,
      fullName,
      title,
      type,
      experience,
      budget,
      description,
      tags,
      location,
      fileUrls,

    });
    const responseData = {
      userId,
      fullName,
      title,
      type,
      experience,
      budget,
      description,
      tags,
      location,
      fileUrls,
    };

    return NextResponse.json(
      { message: "Data Received Successfully", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
