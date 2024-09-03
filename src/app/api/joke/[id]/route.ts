import { connectMongoDB } from "@/lib/mongodb";
import { joke } from "@/models/joke";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    const params = request.nextUrl.pathname.split("/");
    const id = params.pop();
    await connectMongoDB();

    const j = await joke.findOne({ _id: id });
    return NextResponse.json({ j });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro" }, { status: 500 });
  }
}
