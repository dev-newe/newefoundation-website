"use client";

import { AppHomepage, Navigation, Footer } from "@/payload-types";
import { createContext, useContext } from "react";

interface AppContextType {
  data: AppHomepage | null;
  navigation: Navigation | null;
  footer: Footer | null;
  /** Backward compatibility property */
  header?: Navigation | null;
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
  navigation?: Navigation | null;
  footer?: Footer | null;
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
