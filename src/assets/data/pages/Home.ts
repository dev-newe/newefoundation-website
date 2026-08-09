export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ButtonAction {
  label: string;
  href?: string;
  className?: string;
  icon?: string;
}

export interface HeaderSection {
  brand: {
    name: string;
    icon: string;
  };
  navItems: NavItem[];
  ctaButton: ButtonAction;
}

export interface HeroSection {
  badge: {
    text: string;
  };
  title: {
    main: string;
    highlight: string;
  };
  description: string;
  buttons: ButtonAction[];
  image: {
    src: string;
    alt: string;
  };
}

export interface Pillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  stat: string;
  highlighted?: boolean;
}

export interface MissionVisionSection {
  mission: {
    title: string;
    description: string;
    stat: {
      value: string;
      label: string;
    };
  };
  vision: {
    title: string;
    description: string;
  };
  images: {
    primary: {
      src: string;
      alt: string;
    };
    secondary: {
      src: string;
      alt: string;
    };
  };
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  fundedPercentage: number;
  raisedAmount: string;
  targetAmount: string;
  buttonLabel: string;
}

export interface FeaturedProject {
  category: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface OurWorkSection {
  title: string;
  subtitle: string;
  featuredProject: FeaturedProject;
  campaigns: Campaign[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export interface CtaSection {
  title: string;
  highlight: string;
  buttons: ButtonAction[];
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface FooterSection {
  brand: {
    name: string;
    icon: string;
    address: string;
    phone: string;
    email: string;
  };
  linkGroups: FooterLinkGroup[];
  copyright: string;
}

export interface HomePageData {
  header: HeaderSection;
  hero: HeroSection;
  pillars: Pillar[];
  missionVision: MissionVisionSection;
  ourWork: OurWorkSection;
  team: TeamSection;
  cta: CtaSection;
  footer: FooterSection;
}

const home: HomePageData = {
  header: {
    brand: {
      name: "Stewardship NGO",
      icon: "spa",
    },
    navItems: [
      { label: "Home", href: "#", isActive: true },
      { label: "About Us", href: "#" },
      { label: "Our Work", href: "#" },
      { label: "Resources", href: "#" },
      { label: "Contact", href: "#" },
    ],
    ctaButton: {
      label: "Donate Now",
      href: "#donate",
    },
  },
  hero: {
    badge: {
      text: "Creating lasting change",
    },
    title: {
      main: "Empowering Communities,",
      highlight: "Transforming Futures",
    },
    description:
      "Building a world where every individual has the power to thrive. Through sustainable initiatives and community-led action, we are turning hope into tangible, lifelong empowerment.",
    buttons: [
      { label: "Become a Hero", href: "#donate", icon: "arrow_forward", className: "primary" },
      { label: "Our Impact", href: "#impact", className: "outline" },
    ],
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzu_GfhMDXru7GRyrea0CTTEtGRw4YUwPRW-DfN17u6WlBeFI4lORGuavNorh6rKUrX77kEiULH1h-H6uQggbcERmvziI86aYbWUiX93Oh1nEkrrIZlWNWfKI1dJf9maybBljVHFCyoBiE7gqVh8yHjpO2FbShUR8XTEkZWXB-UM_JIghYRiS5HZkcLCIL6b2bVNvLSdHg2U2pjQZZTlqALNhJH2U_z_Sm-K74CZIpbvuEj9fZqTqk1lpWJkq5PQ5lurPaVZy84eQ1sA",
      alt: "A stylized, minimalist map of India designed with soft, organic curves in a deep forest green color, placed against a warm cream background.",
    },
  },
  pillars: [
    {
      id: "education",
      icon: "school",
      title: "Education",
      description:
        "Providing access to quality learning resources and building schools in underserved regions to bridge the educational gap.",
      stat: "12,000+ Students",
    },
    {
      id: "women-empowerment",
      icon: "diversity_1",
      title: "Women Empowerment",
      description:
        "Equipping women with vocational skills, financial literacy, and leadership training to foster economic independence.",
      stat: "8,500+ Entrepreneurs",
      highlighted: true,
    },
    {
      id: "research",
      icon: "science",
      title: "Research",
      description:
        "Conducting ground-level research to understand community needs and develop sustainable, data-driven solutions.",
      stat: "45+ Field Studies",
    },
  ],
  missionVision: {
    mission: {
      title: "Our Mission",
      description:
        "To create resilient communities by addressing the root causes of inequality. We believe in grassroots action, empowering local leaders to drive sustainable, generational change from within.",
      stat: {
        value: "50k+",
        label: "Lives Impacted Annually",
      },
    },
    vision: {
      title: "Our Vision",
      description:
        "A world where geographic and socioeconomic barriers do not dictate a child's future, where communities are self-sustaining, and where compassion drives systemic innovation.",
    },
    images: {
      primary: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Pj4aEpv35FQZ1C7ooFgKDpkxlKUiZatdJFrqEJfO9EqlFJiyrayJ87wsQ2XKOV4wdQ2NqOF8vtNVZ2nUE3awpEW3AJsvHh9l189EZyAp0YCQBjPcK08tpKMnCI3vPeNzpVHn4gvtpcPd84q710823nUi5zMF4cDk5uHtrT7dj51MZ0HEST-LmxdPxtcihtB_gTHh2QE7KL2wlAJFdpfKecw2bPl93msImBmK1sIGnh2OK_DfC1wq",
        alt: "Diverse group of community members engaged in a collaborative learning environment",
      },
      secondary: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvlyMqsweywTXscj-TMHDulrETR5y8qWM8c8N4hN8Z8ms14lr_V8MUTY4YV06u9FSSPyZWZt56vVS4DhlwiXriuDJlOcZXOk9FOa4mcABkbk4DfIHs4ICcnFhbxMcAXncYLSqCqL_B_4ijzebdsXqBDTNVByqRI1IYJtoN-qLyobfw6MPJzEinJchkUZxkDm9o3DvVCqEPX5s-IWJxLCKoE2qrp4MzjdXs8w-LGWHINcDH3SxybP4o",
        alt: "Close-up portrait of an elderly community leader smiling warmly",
      },
    },
  },
  ourWork: {
    title: "Our Work",
    subtitle:
      "Discover our active projects and campaigns driving real, measurable impact across communities.",
    featuredProject: {
      category: "Renewable Energy",
      title: "Sustainable Power for Rural Villages",
      description:
        "Empowering communities with solar energy solutions to foster self-reliance and environmental stewardship.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYm7TG6a1Ro8aS5F_f9tqBChJ_8B7qsNSH2IyaiVhpk2FEcZQpQYECxviM0qJEha65kwgjS9sBPXVBKO7RvBFHkq5-ptYWlWFkpCbtpe_miol-HjWcrBWJUULTGItwkhEhw-b6DVL2bwkUF5EngZvEcj5KgWTSJU_pj_v6hnmIfn1EXX6kB8dEto5Me98u2QBglB4YmQdKQd8cuB4xXQbQA9qBAq92Xc-3kCgnB7wmyW1nS0Vl0EgE",
        alt: "Renewable Energy - Solar Panels in Rural Village",
      },
    },
    campaigns: [
      {
        id: "clean-water",
        title: "Clean Water Initiative",
        description: "Providing safe, clean drinking water access to remote areas.",
        fundedPercentage: 82,
        raisedAmount: "$41k",
        targetAmount: "$50k",
        buttonLabel: "Donate",
      },
      {
        id: "digital-literacy",
        title: "Digital Literacy for Girls",
        description: "Equipping young women with essential technology skills.",
        fundedPercentage: 45,
        raisedAmount: "$9k",
        targetAmount: "$20k",
        buttonLabel: "Donate",
      },
    ],
  },
  team: {
    title: "Meet the Team Behind the Impact",
    members: [
      {
        id: "rajiv-mehta",
        name: "Rajiv Mehta",
        role: "Founder",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNWOT7yoX69sPZo7N4VV4f-7GWl-Wb2FfHrrI3q6iypfrMrgMET0xcYUJwJa455zQkAXNnAnhRTWpM4Mh7S0QqKDujKzy2IS8fac6rBaU6HyWkdyt453SIhR-7cpfDHHAAs1reENKSyAtDbXGWvLoE5MF8GE8mA0bbHdUGUi7gnI0XOBm3ie8oS6rOh6u32zbSLuOwpXzP72KSW5gaItHvrzj-6mm--E43vEBucuvqaCA0WP-mk-Up",
          alt: "Rajiv Mehta - Founder",
        },
      },
      {
        id: "ananya-singh",
        name: "Ananya Singh",
        role: "Program Director",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwuWegG7h7E9Scmls7HHKLsQfXuC31vl4Wt6v0CilcF5pWh3_E7O-nTZ6d1k89sq84uwLYRnOR6QH87hesb78bLe66uq17GpgZkNvBKBj5yRij3TAn0jDY5KUBDuFtXbfeIiFk753Utaq4pt-SCv7I0CciDxYr63mvsnWfyy3ZdTOoYHIGxbB_Y1KkJiZrPlf9VhxHYryR432hm_JYkPB6bPvGf_YNluN1EQX0I3VYIw2Qe2y9sId",
          alt: "Ananya Singh - Program Director",
        },
      },
      {
        id: "vikram-patel",
        name: "Vikram Patel",
        role: "Community Lead",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKjPJi0MLX_RIY-23ymhwcAgvJpIQE7e2JQA3rggUrcHFvDrY9ASe9Djog46fQiWf6pmbBZS215ft5UGzZGk30ShZCvMSqW9qv89O3JXzER_t15_x_oVSevD3it2bjGLzy9Wgcaw8xKwvpz16N8D5EwHWrYEJCY-gD45oADWotq4rG7b3Fc-lAfolyIbahfbblw5XPc27YY6H5UzFdlWQ3AMM9ywyaSzNZBzjuGfaQ51Iyco0h8X77",
          alt: "Vikram Patel - Community Lead",
        },
      },
      {
        id: "maya-rao",
        name: "Dr. Maya Rao",
        role: "Research Head",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXBkEaiN9UOxiomWCahtaItHMgupkFetdTMgk7zUpksaee9-SVcY6bFILyZ9fUxpk_JiZPoZaC7U4JBoIkNJlwa8Q9RYq6qEfXmspU5MZcDNQtv5PoR0Ii06dZB_wuSgCJlUALjXU86Ion9KwQfA9ai9vCKAjm6HOKANFwByxZyc4RkmUn3eAlSty_DtcsOdhiJ2EGGoofOSYN1FUpSmMOUcvqyijx_qeSewDl_TQMahpy2sY1kxYI",
          alt: "Dr. Maya Rao - Research Head",
        },
      },
    ],
  },
  cta: {
    title: "Your small action creates a",
    highlight: "ripple of real change",
    buttons: [
      { label: "Donate Now", href: "#donate", className: "primary" },
      { label: "Join as Volunteer", href: "#volunteer", className: "outline" },
    ],
  },
  footer: {
    brand: {
      name: "Stewardship NGO",
      icon: "spa",
      address: "Address tada tada",
      phone: "39457745",
      email: "wuyg@ujej.co",
    },
    linkGroups: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "#" },
          { label: "About Us", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        title: "Activity",
        links: [
          { label: "Our Work", href: "#" },
          { label: "Campaigns", href: "#" },
          { label: "Become a Member", href: "#" },
        ],
      },
      {
        title: "Legal & Transparency",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Annual Reports", href: "#" },
        ],
      },
    ],
    copyright:
      "© 2024 Organic Stewardship NGO. All rights reserved. Registered Charity No. 1234567.",
  },
};

export { home };
