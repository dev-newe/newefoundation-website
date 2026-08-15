"use client";

import { AppNavigation } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  content?: AppNavigation["brandName"];
  logo?: AppNavigation["logo"];
}

const BrandLogo = ({ content, logo }: BrandLogoProps) => {
  if (!content || !content.text) {
    return null;
  }

  const media = typeof logo?.media === "object" && logo?.media !== null ? logo.media : null;

  return (
    <Link href="/">
      <div className="flex w-fit items-center gap-2 overflow-hidden rounded-lg">
        {media?.url && (
          <Image src={media.url} alt={media.alt || content.text || "Logo"} width={48} height={48} />
        )}
        <h3 className="text-lg font-semibold md:text-xl">{content.text}</h3>
      </div>
    </Link>
  );
};

export default BrandLogo;
