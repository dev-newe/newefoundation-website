import { getGlobal } from "@/services/payload";
import type { AppFooter } from "@/payload-types";

export async function getFooterData(): Promise<AppFooter | null> {
  return getGlobal("app_footer");
}
