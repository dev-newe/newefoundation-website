import { getGlobal } from "@/services/payload";
import type { Navigation } from "@/payload-types";

export async function getNavigationData(): Promise<Navigation | null> {
  return getGlobal("navigation");
}
