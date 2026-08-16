import CTA from "@/components/shared/cta/CTA";
import Hero from "@/features/contact/Hero";
import Information from "@/features/contact/Information";
import Map from "@/features/contact/Map";
import MessageForm from "@/features/contact/MessageForm";
import { getGlobal } from "@/services/payload";

const Contact = async () => {
  const contactpage = await getGlobal("app_contactpage");
  console.log({ contactpage });
  return (
    <div>
      <Hero />
      <div className="flex flex-col gap-8 px-6 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:flex-row lg:px-20">
        <Information data={contactpage?.contactInfo} />
        <MessageForm data={contactpage?.contactForm} />
      </div>
      <Map />
      <CTA />
    </div>
  );
};

export default Contact;
