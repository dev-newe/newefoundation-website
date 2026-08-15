import { getGlobal } from "@/services/payload";
import type { Footer } from "@/payload-types";

export async function getFooterData(): Promise<Footer | null> {
  return getGlobal("footer");
}
