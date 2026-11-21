import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export default async function MainRootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="relative w-full max-w-[100vw] overflow-x-hidden">
        <div className="fixed inset-x-0 top-0 z-50 w-full max-w-[100vw]">
          <Navbar />
        </div>

        {children}
      </div>

      <Footer />
    </>
  );
}