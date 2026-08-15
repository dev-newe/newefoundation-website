import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AppProvider from "@/context/AppContext";
import { getHomeData } from "@/lib/payload/getHomeData";

export default async function MainRootLayout({ children }: LayoutProps<"/">) {
  const data = await getHomeData();

  return (
    <AppProvider data={data}>
      <Navbar />
      {children}
      <Footer />
    </AppProvider>
  );
}
