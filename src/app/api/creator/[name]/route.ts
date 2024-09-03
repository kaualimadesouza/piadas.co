import { connectMongoDB } from "@/lib/mongodb";
import { cre } from "@/models/creator";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.pathname.split("/");
  const name = params.pop();
  console.log(name);

  await connectMongoDB();
  //const creators = await cre.find();
  const creator = await cre.findOne({name: name});
  return NextResponse.json({ creator });
}
