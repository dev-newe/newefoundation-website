import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://newefoundation.org/"),

  title: {
    default: "Navjyoti Foundation",
    template: "%s | Navjyoti Foundation",
  },

  description:
    "Navjyoti Foundation is a non-profit organization dedicated to advancing education, Women Empowerment, and research.",

  keywords: ["Non-profit organization", "Education", "Women Empowerment", "Research"],

  authors: [
    {
      name: "Navjyoti Foundation",
    },
  ],

  creator: "Navjyoti Foundation",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Navjyoti Foundation",
    title: "Navjyoti Foundation",
    description:
      "Navjyoti Foundation is a non-profit organization dedicated to advancing education, Women Empowerment, and research.",
    url: "https://newefoundation.org/",
    images: [
      {
        url: "/navjyoti.png",
        width: 1200,
        height: 630,
        alt: "Navjyoti Foundation",
      },
    ],
  },

  // TODO: Add Twitter card metadata if available else remove
  /*twitter: {
    card: "summary_large_image",
    title: "Navjyoti Foundation",
    description:
      "Navjyoti Foundation is a non-profit organization dedicated to advancing education, Women Empowerment, and research.",
    images: ["/navjyoti.png"],
  },*/
};
