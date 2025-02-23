import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import { NextRequest } from "next/server";
import User from "../../../models/user";
import { Types } from "mongoose";

interface RequestBody {
  userId: string;
  dob: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipPostalCode: string;
  phone: string;
  profilePicture: string;
}

export async function POST(req: NextRequest) {
  try {
    // Now we can use the user data that we decoded and attached from the middleware
    const user = req.user;

    // No need to validate if there is a user id or not as well
    const userId = user.id;

    const {
      dob,
      country,
      streetAddress,
      city,
      state,
      zipPostalCode,
      phone,
      profilePicture,
    }: RequestBody = await req.json();

    console.log("Request Body:", {
      dob,
      country,
      streetAddress,
      city,
      state,
      zipPostalCode,
      phone,
      profilePicture,
    });

    await connectMongoDB();

    const fieldsToUpdate: Partial<RequestBody> = {};
    if (dob) fieldsToUpdate.dob = dob;
    if (country) fieldsToUpdate.country = country;
    if (streetAddress) fieldsToUpdate.streetAddress = streetAddress;
    if (city) fieldsToUpdate.city = city;
    if (state) fieldsToUpdate.state = state;
    if (zipPostalCode) fieldsToUpdate.zipPostalCode = zipPostalCode;
    if (phone) fieldsToUpdate.phone = phone;
    if (profilePicture) fieldsToUpdate.profilePicture = profilePicture;

    console.log("Fields to Update:", fieldsToUpdate);

    const updatedUser = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $set: fieldsToUpdate },
      { new: true, runValidators: true, strict: false }
    );

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Attributes added successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
