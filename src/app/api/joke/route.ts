import { connectMongoDB } from "@/lib/mongodb";
import { joke } from "@/models/joke";
import { cre } from "@/models/creator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  
  await connectMongoDB();
  const jokes = await joke.find();
  return NextResponse.json({ jokes }); 
}

export async function POST(request: any) {
  try {
    await connectMongoDB();
    const { title, text, creator, video_url, tags, likes } =
      await request.json();
    const j = await joke.create({
      title,
      text,
      creator,
      video_url,
      tags,
      likes,
    });
    const { _id } = j;
    const c = await cre.updateOne(
      { name: creator },
      { $push: { piadas: _id } }
    );
    //const c = await cre.find({ name: creator });
    return NextResponse.json({ message: "Joke Created", j }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro" }, { status: 500 });
  }
}
