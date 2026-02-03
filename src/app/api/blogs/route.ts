import { NextResponse } from "next/server";
import type { BlogsResponse } from "@/lib/microcms";
import { client } from "@/lib/microcms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "0";

  try {
    const data = await client.get<BlogsResponse>({
      endpoint: "blogs",
      queries: {
        limit: Number(limit),
        offset: Number(offset),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
