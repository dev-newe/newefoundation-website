// lib/payload/getAppData.ts
import { getPayload } from "payload";
import config from "@/payload.config";

export async function getHomeData() {
  const payload = await getPayload({ config });

  return payload.findGlobal({
    slug: "app_homepage",
  });
}
