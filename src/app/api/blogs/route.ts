import { client } from "@/lib/microcms";
import type { Blogs } from "@/types/microcms";
import { NextResponse } from "next/server";

// cache
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = Number(searchParams.get("offset") ?? "0");
  const q = searchParams.get("q") ?? undefined;

  try {
    const response = await client.getList<Blogs>({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "blogs",
      queries: { limit, offset, q },
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
