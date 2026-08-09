"use client";
import { HeroSection } from "@/assets/data/pages/Home";

const Hero = ({ data }: { data: HeroSection }) => {
  console.log(data, "data");
  return <div>Hero</div>;
};

export default Hero;
