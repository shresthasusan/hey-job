import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model type with generics.
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
