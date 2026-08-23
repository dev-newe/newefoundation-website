import SectionWrapper from "@/components/ui/SectionWrapper";
import { AppHomepage } from "@/payload-types";
import { resolvePayloadImage } from "@/services/payload";
import { Badge } from "@/components/ui/badge";
import {
  DirectorsList,
  ResolvedDirector,
  Director,
} from "@/features/home/components/team/DirectorsList";
import {
  TeamDrawer,
  ResolvedTeamMember,
  TeamMember,
} from "@/features/home/components/team/TeamDrawer";

export type TeamProps = {
  data?: AppHomepage["team"];
};

const defaultDirectors: Director[] = [];
const defaultMembers: TeamMember[] = [];

const Team = ({ data }: TeamProps) => {
  const directorsSource =
    data?.directors && data.directors.length > 0 ? data.directors : defaultDirectors;
  const membersSource = data?.members && data.members.length > 0 ? data.members : defaultMembers;

  const team = {
    badge: data?.badge ?? "Our People",
    title: data?.title ?? "Leadership & Team",
    description:
      data?.description ??
      "Meet the visionary leaders and dedicated team behind our ground-level programs.",
    directors: directorsSource.map((director) => ({
      ...director,
      image: resolvePayloadImage(director.image),
    })) as ResolvedDirector[],
    members: membersSource.map((member) => ({
      ...member,
      image: resolvePayloadImage(member.image),
    })) as ResolvedTeamMember[],
    drawerButtonText: data?.teamDrawerButtonText ?? "Meet Our Team",
    drawerHeading: data?.teamDrawerHeading ?? "Meet Our Dedicated Team",
    drawerDescription:
      data?.teamDrawerDescription ??
      "Our ground staff, educators, and field officers working tirelessly to create sustainable, lasting impact.",
  };

  return (
    <SectionWrapper id="team" size="wide">
      <div className="flex flex-col items-center">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Badge variant="accent" className="mb-2">
            {team.badge}
          </Badge>
          <h2 className="text-foreground text-fluid-4xl font-serif font-medium tracking-tight">
            {team.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
            {team.description}
          </p>
        </div>

        {/* Directors List */}
        <div className="flex w-full flex-col gap-12">
          <DirectorsList directors={team.directors} />
        </div>

        {/* Meet Our Team Drawer */}
        <div className="mt-12 text-center">
          <TeamDrawer
            buttonText={team.drawerButtonText}
            heading={team.drawerHeading}
            description={team.drawerDescription}
            members={team.members}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Team;
