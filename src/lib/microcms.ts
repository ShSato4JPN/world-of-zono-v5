import { createClient } from "microcms-js-sdk";

const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN as string;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY as string;

export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});
