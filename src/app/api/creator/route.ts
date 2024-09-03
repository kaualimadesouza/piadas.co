import { connectMongoDB } from "@/lib/mongodb";
import { cre } from "@/models/creator";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, description } = await request.json();
  await connectMongoDB();
  await cre.create({ name, description });
  return NextResponse.json({ message: "Creator Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  //const creators = await cre.find();
  const creators = await cre.find();
  return NextResponse.json({ creators });
}
