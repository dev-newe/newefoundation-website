import { getGlobal } from "@/services/payload";
import type { AppNavigation } from "@/payload-types";

export async function getNavigationData(): Promise<AppNavigation | null> {
  return getGlobal("app_navigation");
}
