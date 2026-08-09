"use client";
import { OurWorkSection } from "@/assets/data/pages/Home";
import DetailedWork from "@/features/work/components/DetailedWork";

const OurWork = ({ data }: { data: OurWorkSection }) => {
  console.log(data, "data");
  return (
    <div>
      OurWork
      <DetailedWork />
    </div>
  );
};

export default OurWork;
