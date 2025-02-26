import { connectMongoDB } from "@/app/lib/mongodb";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectMongoDB();
    const userData = req.headers.get("user");
    const user = userData ? JSON.parse(userData) : null;

    if (user.role !== 'superadmin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const searchQuery = req.nextUrl.searchParams.get('searchQuery');
    const roleFilter = req.nextUrl.searchParams.get('roleFilter');
    const userName = req.nextUrl.searchParams.get('userName');
    const userId = req.nextUrl.searchParams.get('userId');
    const currentUser = req.nextUrl.searchParams.get('currentUser');


    try {
        let query: any = {};

        if (searchQuery) {
            query = {
                ...query,
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { userName: { $regex: searchQuery, $options: "i" } },
                ],
            };
        }

        if (roleFilter) {
            query = { ...query, role: roleFilter };
        }

        if (userName) {
            query = { ...query, userName: { $regex: userName, $options: "i" } };
        }

        if (userId) {
            query = { ...query, _id: userId };
        }
        if (currentUser) {

            query = { ...query, _id: user.id };
        }
        const admins = await Admin.find(query);
        return NextResponse.json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        return NextResponse.error();
    }
}