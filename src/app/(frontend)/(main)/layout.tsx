import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AppProvider from "@/context/AppContext";
import { getHomeData } from "@/lib/payload/getHomeData";
import { getNavigationData } from "@/lib/payload/getNavigationData";
import { getFooterData } from "@/lib/payload/getFooterData";

export default async function MainRootLayout({ children }: LayoutProps<"/">) {
  const [data, navigation, footer] = await Promise.all([
    getHomeData(),
    getNavigationData(),
    getFooterData(),
  ]);

  return (
    <AppProvider data={data} navigation={navigation} footer={footer}>
      <Navbar data={navigation} />
      {children}
      <Footer data={footer} />
    </AppProvider>
  );
}
