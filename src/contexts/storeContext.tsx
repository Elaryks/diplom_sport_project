import React, { createContext, ReactNode } from "react";
import { RootStore } from "../stores/rootStore";

let store: RootStore;

export const StoreContext = createContext<RootStore | undefined>(undefined);

export function RootStoreProvider({ children }: { children: ReactNode }) {
  const root = store ?? new RootStore();
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}