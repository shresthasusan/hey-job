import mongoose, { Document, Schema, Model } from "mongoose";

interface IImage {
    url: string; // URL of the image
    name: string; // Name or title of the image
    size: number; // Size in bytes
    uploadedAt: Date; // Timestamp of when the image was uploaded
}

interface IImageBundle {
    name: string; // Name of the bundle (e.g., "Design Concepts")
    images: IImage[]; // Array of images within this bundle
}

interface IPortfolio extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string; // Portfolio title
    description: string; // Brief description of the portfolio
    bundles: IImageBundle[]; // Array of image bundles
    createdAt: Date; // Timestamp for portfolio creation
    updatedAt: Date;
}

const ImageSchema = new Schema<IImage>({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    size: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const ImageBundleSchema = new Schema<IImageBundle>({
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    images: {
        type: [ImageSchema],
        default: [],
    },
});

const PortfolioSchema = new Schema<IPortfolio>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 255,
        },
        description: {
            type: String,
            maxlength: 1024,
        },
        bundles: {
            type: [ImageBundleSchema], // Array of image bundles
            default: [],
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create model
const Portfolio: Model<IPortfolio> =
    mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
