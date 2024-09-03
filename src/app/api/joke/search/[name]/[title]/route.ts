import { joke } from "@/models/joke";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const params = request.nextUrl.pathname.split("/");
  const piada = params[params.length - 1];
  const creator = params[params.length - 2];

  const j = await joke.find({ title: { $regex: new RegExp(piada, "i") }, creator });

  return NextResponse.json({ j });
}
