"use client";

import { useState } from "react";
import Image from "next/image";
import { AppHomepage } from "@/payload-types";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";

export type Director = NonNullable<NonNullable<AppHomepage["team"]>["directors"]>[number];
export type ResolvedDirector = Omit<Director, "image"> & { image: { url: string; alt: string } };

interface DirectorsListProps {
  directors: ResolvedDirector[];
}

export const DirectorsList = ({ directors }: DirectorsListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<ResolvedDirector | null>(null);

  const handleOpenMessage = (director: ResolvedDirector) => {
    setSelectedDirector(director);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-12">
      {directors.map((director, index) => {
        const isRight = director.imagePosition === "right";

        return (
          <article
            key={index}
            className={cn(
              "grid grid-cols-1 items-center gap-8",
              isRight ? "md:grid-cols-[1fr_260px]" : "md:grid-cols-[260px_1fr]"
            )}
          >
            {/* Image Column */}
            <div
              className={cn("relative aspect-square w-full", isRight ? "md:order-2" : "md:order-1")}
            >
              <Image
                src={director.image.url}
                alt={director.image.alt || director.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-xl object-cover"
              />
            </div>

            {/* Text Column */}
            <div className={cn("flex flex-col", isRight ? "md:order-1" : "md:order-2")}>
              <h3 className="font-serif text-2xl font-bold">{director.name}</h3>
              <p className="text-accent mt-1 text-sm font-bold tracking-wider uppercase">
                {director.role}
              </p>

              <span className="text-muted-foreground/30 mt-4 font-serif text-4xl">“</span>
              <p className="text-muted-foreground font-sans italic">{director.bio}</p>

              <div className="mt-4">
                <Button
                  variant="link"
                  onClick={() => handleOpenMessage(director)}
                  className="hover:text-accent flex h-auto cursor-pointer items-center gap-2 p-0 text-sm font-bold"
                >
                  <span>{director.buttonText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>
        );
      })}

      {/* Reused Single Drawer for Director Messages */}
      <Drawer open={open} onOpenChange={setOpen} showSwipeHandle={true}>
        <DrawerContent className="bg-card border-border">
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

          {selectedDirector && (
            <div className="mx-auto flex h-full max-h-[85vh] w-full max-w-2xl flex-col p-6">
              <DrawerHeader className="border-border/40 flex flex-col items-center border-b pb-4 text-center">
                <DrawerTitle className="text-primary text-center font-serif text-xl font-bold">
                  {selectedDirector.drawer.heading}
                </DrawerTitle>
                <DrawerDescription className="text-accent mt-1 text-center text-xs font-bold tracking-wider uppercase">
                  {selectedDirector.drawer.subheading}
                </DrawerDescription>
              </DrawerHeader>

              {/* Scrollable message content (Centered) */}
              <div className="flex-1 [scrollbar-width:none] overflow-y-auto py-6 text-center [&::-webkit-scrollbar]:hidden">
                <div className="prose text-muted-foreground text-center font-sans text-sm leading-relaxed whitespace-pre-line md:text-base">
                  {selectedDirector.drawer.message}
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
