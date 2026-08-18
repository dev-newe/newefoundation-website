import CTA from "@/components/shared/cta/CTA";
import Hero from "@/features/contact/components/Hero";
import Information from "@/features/contact/components/Information";
import Map from "@/features/contact/components/Map";
import MessageForm from "@/features/contact/components/MessageForm";
import { getGlobal } from "@/services/payload";

const Contact = async () => {
  const contactpage = await getGlobal("app_contactpage");
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-8 px-6 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:flex-row lg:px-20">
        <Information data={contactpage?.contactInfo} />
        <MessageForm data={contactpage?.contactForm} />
      </div>
      <Map />
      <CTA />
    </main>
  );
};

export default Contact;
