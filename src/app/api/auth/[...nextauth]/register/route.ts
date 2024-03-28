import { dbConnect } from "@/db/dbConnect";
import User from "@/db/models/User";
import { NextResponse } from "next/server";
var bcrypt = require('bcryptjs');

export async function POST(req:any) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 8);
    await dbConnect();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}