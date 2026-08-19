import { getGlobal } from "@/services/payload";
import type { AppContactpage } from "@/payload-types";

export async function getContactData(): Promise<AppContactpage | null> {
  return getGlobal("app_contactpage");
}
