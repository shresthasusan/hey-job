import { connectMongoDB } from "@/app/lib/mongodb";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {

    try {
        await connectMongoDB();

        // Authenticate the request (optional: restrict access)


        // Fetch all admin users except the requesting admin
        const user = JSON.parse(req.headers.get('user') || '{}');
        const myEmail = user.email;
        const admins = await Admin.find(
            { userName: { $ne: myEmail } },
            "name email role"
        ).lean();
        return NextResponse.json(admins, { status: 200 });
    } catch (error) {
        console.error("Error fetching admins:", error);
        return NextResponse.json({ message: "Error fetching admins" }, { status: 500 });
    }
}
