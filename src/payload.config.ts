import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import path from "path";
import dns from "node:dns";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Users } from "@/db/collections/Users";
import { Media } from "@/db/collections/Media";
import { CloudinaryCleanupJobs } from "@/db/collections/CloudinaryCleanupJobs";
import { HomePage } from "@/db/pages/HomePage";
import { cloudinaryAdapter } from "@/storage/cloudinary";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

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
  collections: [Users, Media, CloudinaryCleanupJobs],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
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
