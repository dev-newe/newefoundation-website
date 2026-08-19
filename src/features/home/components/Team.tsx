import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { AppHomepage } from "@/payload-types";
import { PayloadImageField, resolvePayloadImage } from "@/services/payload";
import Image from "next/image";

type TeamProps = {
  data?: AppHomepage["team"];
};

type TeamMember = NonNullable<NonNullable<AppHomepage["team"]>["members"]>[number];

const defaultMembers: TeamMember[] = [];

const Team = ({ data }: TeamProps) => {
  const team = {
    title: data?.title ?? "Meet the Team Behind the Impact",
    members: data?.members && data.members.length > 0 ? data.members : defaultMembers,
  };

  return (
    <SectionWrapper id="team" as="section" size="wide" className="bg-background">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-fluid-4xl text-foreground text-center font-serif font-bold">
          {team.title}
        </h2>

        <div className="mt-12 grid w-full grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.members.map((member) => (
            <TeamCard
              key={member?.id || member?.name}
              name={member?.name ?? "Team Member"}
              role={member?.role ?? "Member"}
              image={member?.image}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

interface TeamMemberProps {
  name?: string;
  role?: string;
  image?: PayloadImageField;
  className?: string;
}

const TeamCard = ({ name, role, image, className }: TeamMemberProps) => {
  const { url, alt } = resolvePayloadImage(image);

  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-center p-0 transition-all duration-300",
        className
      )}
    >
      <div className="border-background bg-muted relative mb-5 aspect-square h-40 w-40 overflow-hidden rounded-full border-4 drop-shadow-md transition-all duration-500">
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(max-width: 768px) 160px, 160px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <h3 className="text-fluid-lg text-foreground group-hover:text-primary text-center font-serif font-bold transition-colors duration-300">
        {name}
      </h3>
      <p className="text-accent mt-1.5 text-center font-sans text-xs font-bold tracking-wider uppercase">
        {role}
      </p>
    </div>
  );
};

export default Team;
