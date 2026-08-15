import About from "@/features/home/components/About";
import CTA from "@/components/shared/cta/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";

import { getGlobal } from "@/services/payload";

export default async function Home() {
  const homepage = await getGlobal("app_homepage");

  console.log("Homepage data:", homepage); // Debugging line to check the data being fetched

  return (
    <main>
      <Hero data={homepage?.hero} />
      <About />
      <Mission />
      <OurWork data={homepage?.ourWork} />
      <Team />
      <CTA data={homepage?.cta} />
    </main>
  );
}
