"use client";

import { AppHomepage } from "@/payload-types";
import { createContext, useContext } from "react";

const AppContext = createContext<AppHomepage | null>(null);

export default function AppProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: AppHomepage | null;
}) {
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
