import { connectMongoDB } from "@/app/lib/mongodb";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectMongoDB();

    const searchQuery = req.nextUrl.searchParams.get('searchQuery');
    const roleFilter = req.nextUrl.searchParams.get('roleFilter');
    const userName = req.nextUrl.searchParams.get('userName');

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

        const admins = await Admin.find(query);
        return NextResponse.json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        return NextResponse.error();
    }
}