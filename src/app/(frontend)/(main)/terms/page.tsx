import { getGlobal } from "@/services/payload";
import Terms from "@/features/terms/components/Terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Navjyoti Foundation",
  description:
    "Terms and Conditions of use for the Navjyoti Education and Women Empowerment Foundation (NEWE) website.",
};

const TermsPage = async () => {
  const termsData = await getGlobal("app_terms");
  return <Terms data={termsData} />;
};

export default TermsPage;
