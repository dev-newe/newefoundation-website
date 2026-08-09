import type { StaticHandler } from "@payloadcms/plugin-cloud-storage/types";

export const getStaticHandler = (): StaticHandler => {
  return async () => {
    return new Response("Not Found", { status: 404 });
  };
};
