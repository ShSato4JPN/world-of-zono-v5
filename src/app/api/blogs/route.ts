import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/microcms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = Number(searchParams.get("offset") ?? "0");

  try {
    const data = await getBlogs(limit, offset);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
