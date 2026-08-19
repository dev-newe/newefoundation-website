"use client";

import { AppHomepage, AppNavigation, AppFooter } from "@/payload-types";
import { createContext, useContext } from "react";

interface AppContextType {
  data: AppHomepage | null;
  navigation: AppNavigation | null;
  footer: AppFooter | null;
  /** Backward compatibility property */
  header?: AppNavigation | null;
}

const AppContext = createContext<AppContextType>({
  data: null,
  navigation: null,
  footer: null,
});

export default function AppProvider({
  children,
  data,
  navigation = null,
  footer = null,
}: {
  children: React.ReactNode;
  data: AppHomepage | null;
  navigation?: AppNavigation | null;
  footer?: AppFooter | null;
}) {
  return (
    <AppContext.Provider
      value={{
        data,
        navigation,
        footer,
        header: navigation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
