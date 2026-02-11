import { client } from "@/lib/microcms";
import type { Category } from "@/types/microcms";
import { NextRequest, NextResponse } from "next/server";

// cache
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/categories/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const response = await client.getListDetail<Category>({
      endpoint: "categories",
      contentId: id,
      customRequestInit: {
        cache: "no-store",
      },
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
