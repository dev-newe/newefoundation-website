"use client";

import { AppHomepage } from "@/payload-types";
import Image from "next/image";

interface BrandLogoProps {
  content?: AppHomepage["header"]["brandName"];
  logo?: AppHomepage["header"]["logo"];
}

const BrandLogo = ({ content, logo }: BrandLogoProps) => {
  if (!content || !content.text) {
    return null;
  }

  const media = typeof logo?.media === "object" && logo?.media !== null ? logo.media : null;

  return (
    <div>
      {media?.url && (
        <Image
          src={media.url}
          alt={media.alt || content.text || "Logo"}
          width={media.width || 100}
          height={media.height || 40}
        />
      )}
      <p>{content.text}</p>
    </div>
  );
};

export default BrandLogo;
