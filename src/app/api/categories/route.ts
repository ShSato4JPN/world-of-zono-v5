import { client } from "@/lib/microcms";
import { Category } from "@/types/microcms";
import { NextResponse } from "next/server";

// cache
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await client.getAllContents<Category[]>({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "categories",
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
