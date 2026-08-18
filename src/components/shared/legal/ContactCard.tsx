import { Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type ContactCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

const ContactCard = ({ title, description, buttonLabel, buttonHref }: ContactCardProps) => {
  return (
    <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/10">
        <Mail className="size-5 text-white" />
      </div>
      <h3 className="text-primary-foreground mb-2 font-serif text-lg font-semibold">{title}</h3>
      <p className="text-primary-foreground/80 mb-4 text-sm leading-relaxed">{description}</p>
      <Link
        href={buttonHref}
        className={buttonVariants({
          variant: "accent",
          size: "lg",
          className:
            "text-foreground hover:text-primary-foreground bg-primary-foreground hover:bg-accent! w-full!",
        })}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default ContactCard;
