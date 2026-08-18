import { AppContactpage } from "@/payload-types";
import { Mail, MapPin, Phone } from "lucide-react";

type InfoProps = {
  data?: AppContactpage["contactInfo"];
};

const Information = ({ data }: InfoProps) => {
  const infoData = {
    email: {
      title: data?.email?.title ?? "Email",
      addresses:
        data?.email?.addresses && data?.email?.addresses.length > 0
          ? data?.email?.addresses
          : [{ address: "service@newefoundation.org" }],
    },
    office: {
      title: data?.office?.title ?? "Our Office",
      address:
        data?.office?.address ??
        "78/89, G.T. Road West, Simla,\nSerampore, Hooghly,\nWest Bengal, India. Pincode - 712203",
    },
    phone: {
      title: data?.phone?.title ?? "Phone",
      numbers:
        data?.phone?.numbers && data?.phone?.numbers.length > 0
          ? data?.phone?.numbers
          : [
              { countryCode: "+91", number: "9830965220" },
              { countryCode: "+91", number: "7001166714" },
            ],
    },
    title: data?.title ?? "Contact Information",
  };
  return (
    <section className="border-primary/20 bg-card w-full rounded-[14px] border p-4 py-6 md:p-9 lg:max-w-150">
      <h2 className="text-primary font-serif text-[18px] font-medium">{infoData.title}</h2>

      <div className="mt-10 space-y-7">
        {/* Address */}
        <div className="flex gap-2 sm:gap-5">
          <MapPin className="text-accent mt-0.5 shrink-0" size={23} strokeWidth={2} />

          <div>
            <h3 className="text-[16px] font-medium text-[#272727]">{infoData.office.title}</h3>

            <p className="text-primary/80 mt-2 max-w-87.5 text-[15px] leading-[1.8]">
              {infoData.office.address}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-2 sm:gap-5">
          <Phone className="text-accent mt-0.5 shrink-0" size={22} strokeWidth={2} />

          <div>
            <h3 className="text-[16px] font-medium text-[#272727]">{infoData.phone.title}</h3>

            <div className="text-primary/80 mt-2 space-y-1 text-[15px]">
              {infoData.phone.numbers.map((n, i) => (
                <p key={`${n.number}-${i}`}>
                  {n.countryCode} {n.number}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-2 sm:gap-5">
          <Mail className="text-accent mt-0.5 shrink-0" size={22} strokeWidth={2} />

          <div>
            <h3 className="text-[16px] font-medium text-[#272727]">{infoData.email.title}</h3>

            <div className="text-primary/80 mt-2 space-y-1 text-[15px] whitespace-pre-line">
              {infoData.email.addresses.map((addr, i) => (
                <a
                  href={`mailto:${addr.address}`}
                  className="text-primary/80 mt-2 block text-[15px] transition-colors hover:text-[#48675d]"
                  key={`${addr.address}-${i}`}
                >
                  {addr.address}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
