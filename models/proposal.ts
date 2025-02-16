import mongoose, { Schema, Document } from "mongoose";

export interface IProposal extends Document {
    jobId: mongoose.Types.ObjectId;
    freelancerId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    coverLetter: string;
    attachments: string[];
    bidAmount: number;
    duration: " less than 1 month" | "1 to 3 months" | "3 to 6 months" | "more than 6 months";
    status: "pending" | "shortlisted" | "accepted" | "rejected" | "withdrawn" | "canceled";
    createdAt: Date;
    updatedAt: Date;
}

const ProposalSchema: Schema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        coverLetter: { type: String, required: true },
        attachments: [{ type: String }],
        bidAmount: { type: Number, required: true },
        duration: {
            type: String, required: true,
            enum: [" less than 1 month", "1 to 3 months", "3 to 6 months", "more than 6 months"]
        },
        status: {
            type: String,
            enum: ["pending", "shortlisted", "accepted", "rejected", "withdrawn", "canceled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

export default mongoose.models.Proposal || mongoose.model<IProposal>("Proposal", ProposalSchema);
