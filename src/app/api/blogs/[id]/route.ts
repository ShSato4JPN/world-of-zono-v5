import { client } from "@/lib/microcms";
import type { Blog } from "@/types/microcms";
import { NextResponse } from "next/server";

// cache
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(_: Request, ctx: RouteContext<"/api/blogs/[id]">) {
  const { id } = await ctx.params;

  try {
    const response = await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId: id,
      customRequestInit: {
        cache: "no-store",
      },
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
