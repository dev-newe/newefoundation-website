import { AppHomepage } from "@/payload-types";

type HeroProps = {
  data: AppHomepage["hero"];
};

const Hero = ({ data }: HeroProps) => {
  return <div>Hero</div>;
};

export default Hero;
