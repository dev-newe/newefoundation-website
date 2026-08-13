import About from "@/features/home/components/About";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <Mission />
      <OurWork />
      <Team />
      <CTA />
    </div>
  );
}
