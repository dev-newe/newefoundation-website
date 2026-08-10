import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Users } from "@/db/collections/Users";
import { Media } from "@/db/collections/Media";
import { CloudinaryCleanupJobs } from "@/db/globals/CloudinaryCleanupJobs";
import { cloudinaryAdapter } from "@/storage/cloudinary";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (
  !process.env.PAYLOAD_SECRET ||
  !process.env.DATABASE_URI ||
  !process.env.RESEND_API_KEY ||
  !process.env.EMAIL_FROM ||
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  throw new Error("Missing required ENV vars for Payload Config");
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  sharp,
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, CloudinaryCleanupJobs],
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
