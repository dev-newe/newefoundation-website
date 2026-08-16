import About from "@/features/home/components/About";
import CTA from "@/components/shared/cta/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";
import Partners from "@/features/home/components/Partners";

import { getGlobal } from "@/services/payload";

export default async function Home() {
  const [homepage, ctaData] = await Promise.all([getGlobal("app_homepage"), getGlobal("app_cta")]);

  return (
    <main>
      <Hero data={homepage?.hero} />
      <About />
      <Mission />
      <OurWork data={homepage?.ourWork} />
      <Team data={homepage?.team} />
      <Partners data={homepage?.ourPartners} />
      <CTA data={ctaData?.cta} />
    </main>
  );
}
