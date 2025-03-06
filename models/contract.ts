import mongoose, { Schema, Document } from "mongoose";


export interface IContract extends Document {
    jobId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    freelancerId: mongoose.Types.ObjectId;
    paymentType: 'fixed' | 'hourly' | 'milestone'
    price: Number;
    deadline: Date;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: Date;
    updatedAt: Date;
}

const ContractSchema: Schema = new Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
        freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
        paymentType: { type: String, enum: ['fixed', 'hourly', 'milestone'], default: 'fixed' },
        price: { type: Number, required: true },
        deadline: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    },
    { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model<IContract>("Contract", ContractSchema);
