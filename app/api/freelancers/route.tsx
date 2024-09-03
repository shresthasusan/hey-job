import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../lib/mongodb";
import FreelancerInfo from "@/models/freelancerInfo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const freelancers = await FreelancerInfo.find();
    console.log("Freelancers details fetched successfully");
    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return NextResponse.json(
      { message: "Error fetching freelancers" },
      { status: 500 }
    );
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongoDB } from "../../lib/mongodb";
// import FreelancerInfo from "@/models/freelancerInfo";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       await connectMongoDB();
//       const freelancers = await FreelancerInfo.find();
//       console.log("Freelancers details fetched successfully");
//       return res.status(200).json({ freelancers });
//     } catch (error) {
//       console.error("Error fetching freelancers:", error);
//       return res.status(500).json({ message: "Error fetching freelancers" });
//     }
//   } else {
//     // Method not allowed
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
