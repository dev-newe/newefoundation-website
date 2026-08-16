import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { AppHomepage } from "@/payload-types";
import {
  GraduationCap,
  Users,
  FlaskConical,
  Heart,
  Target,
  Compass,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Mission = () => {
  return (
    <div className="bg-background py-20 md:py-24">
      <SectionWrapper as="section" id="mission" size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Mission & Vision */}
            <div className="flex flex-col gap-6">
              <Badge variant="accent">Mission & Vision</Badge>
              <h2 className="text-primary font-serif text-3xl leading-tight font-semibold md:text-4xl">
                Empowering Communities Through Action
              </h2>
              <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
                <p>
                  Our mission is to create sustainable and inclusive social change by working
                  closely with local communities to identify real needs and implement practical,
                  effective solutions.
                </p>
                <p>
                  We are dedicated to empowering women, providing quality education, and fostering
                  economic independence through targeted programs and community-driven initiatives.
                </p>
              </div>
            </div>

            {/* Right Side - Our Work Pillars */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 border-border/50 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-2 font-semibold">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  Education
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Providing academic support, study materials, and mentorship to ensure every child
                  has access to quality education.
                </p>
              </div>

              <div className="bg-card/50 border-border/50 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-2 font-semibold">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <Users className="h-4 w-4" />
                  </div>
                  Women Empowerment
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Empowering women through income-generating skills, financial independence, and
                  self-reliance programs.
                </p>
              </div>

              <div className="bg-card/50 border-border/50 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-2 font-semibold">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <FlaskConical className="h-4 w-4" />
                  </div>
                  Skill Development
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Equipping youth with industry-relevant skills to improve employability and foster
                  entrepreneurship.
                </p>
              </div>

              <div className="bg-card/50 border-border/50 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-2 font-semibold">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <Heart className="h-4 w-4" />
                  </div>
                  Community Support
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Providing essential support to vulnerable populations through healthcare, relief
                  efforts, and community development programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Mission;
