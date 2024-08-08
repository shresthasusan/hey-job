import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, name, lastName, password } = await req.json();
    console.log("email", email);
    console.log("name", name);
    console.log("lastname", lastName);
    console.log("password", password);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
