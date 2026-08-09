import About from "@/features/home/components/About";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";
import { home } from "@/assets/data/pages/Home";

export default function Home() {
  return (
    <div className="">
      <Hero data={home.hero} />
      <About data={home.missionVision} />
      <Mission data={home.missionVision} />
      <OurWork data={home.ourWork} />
      <Team data={home.team} />
      <CTA data={home.cta} />
    </div>
  );
}
