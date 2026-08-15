import { getGlobal } from "@/services/payload";
import type { AppHomepage } from "@/payload-types";

export async function getHomeData(): Promise<AppHomepage | null> {
  return getGlobal("app_homepage");
}
