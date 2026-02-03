import type { Blog } from "@/lib/microcms";
import { client } from "@/lib/microcms";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const data = await client.get<Blog>({
      endpoint: "blogs",
      contentId: id,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
