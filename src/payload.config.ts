import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import path from "path";
import dns from "node:dns";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { cloudinaryAdapter } from "@/storage/cloudinary";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";
import { GlobalConfigs } from "@/lib/utils/GlobalConfigs";
import { CollectionConfigs } from "@/lib/utils/CollectionsConfig";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Opt-in workaround for environments whose resolver cannot complete the
// MongoDB Atlas SRV lookup. Set DNS_SERVERS to a comma-separated list.
if (process.env.DNS_SERVERS) {
  try {
    dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));
  } catch (error) {
    console.warn("Invalid DNS_SERVERS value; keeping the system resolver.", error);
  }
}

if (
  !process.env.PAYLOAD_SECRET ||
  !process.env.DATABASE_URI ||
  !process.env.RESEND_API_KEY ||
  !process.env.EMAIL_FROM
) {
  throw new Error("Missing required ENV vars for Payload Config");
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`,
  sharp,
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: CollectionConfigs,
  globals: GlobalConfigs,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    connectOptions: {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM,
    defaultFromName: "Navjyoti Foundation",
    apiKey: process.env.RESEND_API_KEY,
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter(),
          disableLocalStorage: true,
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
