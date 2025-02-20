import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IAdmin extends Document {
    _id: string;
    userName: string;
    name: string;
    lastName: string;
    password: string;

}

// Define the schema corresponding to the document interface.
const userSchema = new Schema<IAdmin>(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },

    { timestamps: true }
);

// Create the model type with generics.
const Admin: Model<IAdmin> =
    mongoose.models.Admin || mongoose.model<IAdmin>("Admin", userSchema);

export default Admin;
