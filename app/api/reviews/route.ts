// Adjust the import based on your project structure
import Review from '@/models/projectindividualreview'; // Adjust the import based on your project structure
import User from '@/models/user'; // Adjust the import based on your project structure
import Contract from '@/models/contract'; // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { contractId, reviewerId, revieweeId, rating, comment } = await req.json();
        if (rating < 0 || rating > 5) {
            return NextResponse.json({ success: false, message: "Rating must be between 0 and 5" }, { status: 400 });
        }
        if (!contractId || !reviewerId || !revieweeId || !rating) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // Save the new review
        const newReview = new Review({ contractId, reviewerId, revieweeId, rating, comment });
        await newReview.save();

        // Determine if the reviewee is a client or freelancer in this contract
        const contract = await Contract.findById(contractId);
        const isClient = contract.clientId.toString() === revieweeId;
        const isFreelancer = contract.freelancerId.toString() === revieweeId;
        if (!isClient && !isFreelancer) {
            return NextResponse.json({ success: false, message: "Reviewee is neither a client nor a freelancer in this contract" }, { status: 400 });
        }


        // Fetch all completed contracts where the reviewee is either the client or the freelancer
        let completedContracts = [];
        if (isClient) {
            completedContracts = await Contract.find({ status: 'completed', clientId: revieweeId });

        } else if (isFreelancer) {
            completedContracts = await Contract.find({ status: 'completed', freelancerId: revieweeId });

        }


        // Calculate the average rating for the reviewee based on their role
        const allReviews = await Review.find({ revieweeId });
        const relevantReviews = allReviews.filter(review => completedContracts.some(contract => contract._id.toString() === review.contractId.toString()));

        let totalRating = 0;
        let totalReviews = 0;

        for (const review of relevantReviews) {
            totalRating += review.rating;
            totalReviews++;
        }

        const avgRating = totalReviews > 0 ? totalRating / totalReviews : 0;



        // Update the User document with the new average rating and review count
        const user = await User.findById(revieweeId);
        if (user) {
            if (isClient) {
                user.reviews.client.rating = avgRating;
                user.reviews.client.reviewCount = totalReviews;
            } else if (isFreelancer) {
                user.reviews.freelancer.rating = avgRating;
                user.reviews.freelancer.reviewCount = totalReviews;
            }
            await user.save();
        }

        return NextResponse.json({ success: true, review: newReview }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
export async function GET(req: Request) {
    try {
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const contractId = searchParams.get('contractId');
        const reviewerId = searchParams.get('reviewerId');
        const revieweeId = searchParams.get('revieweeId');
        const userId = searchParams.get('userId');

        if (!userId) {
            if (!contractId || !reviewerId || !revieweeId) {
                return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
            }
            const existingReview = await Review.findOne({ contractId, reviewerId, revieweeId });

            if (existingReview) {
                return NextResponse.json({ success: true, reviewed: true, review: existingReview }, { status: 200 });
            } else {
                return NextResponse.json({ success: true, reviewed: false }, { status: 200 });
            }

        } else if (userId) {
            const userReviews = await User.findById(userId).select('reviews');
            return NextResponse.json({ success: true, reviews: userReviews }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
