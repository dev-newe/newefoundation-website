import { AppHomepage } from "@/payload-types";

type HeroProps = {
  data?: AppHomepage["hero"];
};

const Hero = ({ data: _data }: HeroProps) => {
  return <div>Hero</div>;
};

export default Hero;
