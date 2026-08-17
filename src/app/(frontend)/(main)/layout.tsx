import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export default async function MainRootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="relative">
        <div className="fixed inset-x-0 top-0 z-50">
          <Navbar />
        </div>

        {children}
      </div>

      <Footer />
    </>
  );
}
