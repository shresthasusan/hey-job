import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

sessionSchema.index({ token: 1 }, { unique: true });

export default mongoose.models.Session || mongoose.model("Session", sessionSchema);