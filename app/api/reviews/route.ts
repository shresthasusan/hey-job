import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import Review from "../../../models/projectindividualreview";

export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const { projectId, reviewerId, revieweeId, rating, comment } = await req.json();

        if (!projectId || !reviewerId || !revieweeId || !rating) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const newReview = new Review({ projectId, reviewerId, revieweeId, rating, comment });

        await newReview.save();

        return NextResponse.json({ success: true, review: newReview }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
