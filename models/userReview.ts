import mongoose, { Model, Schema } from 'mongoose';


interface IUserReview extends Document {
    fullName: string;
    email: string;
    role: "client" | "freelancer";
    rating: number;
    reviewCount: number;
}

const userSchema = new Schema<IUserReview>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["client", "freelancer"], required: true },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviewCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const UserReview: Model<IUserReview> =
    mongoose.models.User || mongoose.model<IUserReview>("User", userSchema);

export default UserReview;
