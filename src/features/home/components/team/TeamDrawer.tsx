"use client";

import Image from "next/image";
import { AppHomepage } from "@/payload-types";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

export type TeamMember = NonNullable<NonNullable<AppHomepage["team"]>["members"]>[number];
export type ResolvedTeamMember = Omit<TeamMember, "image"> & {
  image: { url: string; alt: string };
};

interface TeamDrawerProps {
  buttonText: string;
  heading: string;
  description: string;
  members: ResolvedTeamMember[];
}

export const TeamDrawer = ({ buttonText, heading, description, members }: TeamDrawerProps) => {
  return (
    <Drawer showSwipeHandle={true}>
      <DrawerTrigger render={<Button variant="outline" size="lg" className="gap-2" />}>
        <span>{buttonText}</span>
        <ArrowRight className="h-4 w-4" />
      </DrawerTrigger>

      {/* Bottom Drawer Content */}
      <DrawerContent className="bg-card border-border">
        {/* Close Button Top Right */}
        <DrawerClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 cursor-pointer rounded-full"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </Button>
          }
        />

        <div className="flex max-h-[85vh] flex-col">
          <DrawerHeader className="border-border/40 border-b pb-4">
            <DrawerTitle className="text-primary font-serif text-2xl font-bold">
              {heading}
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground mt-1 text-sm">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          {/* Team Members Grid - Scrollable Container */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-4">
              {members.map((member, index) => {
                return (
                  <div key={index} className="flex flex-col items-center p-2">
                    {/* Circle picture */}
                    <div className="border-border bg-muted relative h-32 w-32 overflow-hidden rounded-full border">
                      <Image
                        src={member.image.url}
                        alt={member.image.alt || member.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>

                    <h4 className="text-foreground mt-3 text-center font-serif text-base font-bold">
                      {member.name}
                    </h4>
                    <p className="text-accent mt-1 text-center text-xs font-bold tracking-wider uppercase">
                      {member.role || "Member"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
