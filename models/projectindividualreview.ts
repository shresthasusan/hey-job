import mongoose, { Schema, Document, Model } from "mongoose";

interface IReview extends Document {
    projectId: mongoose.Schema.Types.ObjectId;
    reviewerId: mongoose.Schema.Types.ObjectId; // Who gives the review
    revieweeId: mongoose.Schema.Types.ObjectId; // Who receives the review
    rating: number;
    comment?: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        revieweeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Review: Model<IReview> =
    mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
