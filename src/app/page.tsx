import About from "@/features/home/components/About";
import CTA from "@/features/home/components/CTA";
import Hero from "@/features/home/components/Hero";
import Mission from "@/features/home/components/Mission";
import OurWork from "@/features/home/components/OurWork";
import Team from "@/features/home/components/Team";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      {/* TODO: Remove this as a temporary placeholder */}
      <div className="bg-background flex h-screen flex-col items-center justify-center">
        <h1>Home</h1>
        <div className="">
          Check pre-defined{" "}
          <Link href="/design-system" className="text-accent underline">
            Design here.
          </Link>
        </div>
      </div>
      {/* End */}

      <Hero />
      <About />
      <Mission />
      <OurWork />
      <Team />
      <CTA />
    </div>
  );
}
