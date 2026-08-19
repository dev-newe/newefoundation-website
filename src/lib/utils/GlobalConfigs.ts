import { HomePage } from "@/db/pages/HomePage";
import { ContactPage } from "@/db/pages/Contact";
import { PrivacyPage } from "@/db/pages/Privacy";
import { TermsPage } from "@/db/pages/Terms";
import { CTA } from "@/db/globals/CTA";
import type { GlobalConfig } from "payload";
import { Footer } from "@/db/globals/Footer";
import { Navigation } from "@/db/globals/Navigation";

export const GlobalPages: GlobalConfig[] = [HomePage, ContactPage, PrivacyPage, TermsPage];

export const GlobalSections: GlobalConfig[] = [Navigation, Footer, CTA];

export const GlobalConfigs: GlobalConfig[] = [...GlobalPages, ...GlobalSections];
