import { joke } from "@/models/joke";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const params = request.nextUrl.pathname.split("/");
  const creator = params.pop();

  const j = await joke.find({ creator });

  return NextResponse.json({ j });
}
