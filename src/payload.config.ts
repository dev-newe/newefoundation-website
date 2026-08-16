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
import { ContactFormResponses } from "@/db/collections/ContactFormResponses";
import { HomePage } from "@/db/pages/HomePage";
import { ContactPage } from "@/db/pages/Contact";
import { Navigation } from "@/db/globals/Navigation";
import { FooterSettings } from "@/db/globals/FooterSettings";
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
  collections: [Users, Media, CloudinaryCleanupJobs, ContactFormResponses],
  globals: [HomePage, ContactPage, Navigation, FooterSettings],
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
