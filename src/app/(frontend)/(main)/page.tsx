import About from "@/features/home/components/About";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";

import { getGlobal } from "@/services/payload";

export default async function Home() {
  const homepage = await getGlobal("app_homepage");

  return (
    <main className="gap-section flex flex-col">
      <Hero data={homepage.hero} />
      <About />
      <Mission />
      <OurWork />
      <Team />
      <CTA />
    </main>
  );
}
