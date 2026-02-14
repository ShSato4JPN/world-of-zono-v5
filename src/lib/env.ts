import { z } from "zod";

const envScheme = z.object({
  NEXT_PUBLIC_SITE_NAME: z.string(),
});

const parsedEnv = envScheme.safeParse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format);
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
