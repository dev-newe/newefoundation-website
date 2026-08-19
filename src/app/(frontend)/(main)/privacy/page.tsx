import { getGlobal } from "@/services/payload";
import Privacy from "@/features/privacy/components/Privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Navjyoti Foundation",
  description:
    "Privacy Policy for the Navjyoti Education and Women Empowerment Foundation (NEWE) website, detailing how we collect, use, and protect your personal information.",
};

const PrivacyPage = async () => {
  const privacyData = await getGlobal("app_privacy");
  return <Privacy data={privacyData} />;
};

export default PrivacyPage;
