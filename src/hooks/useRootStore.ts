import { useContext } from "react";
import { RootStoreContext } from "../contexts/rootStoreContext";

export function useRootStore() {
  const context = useContext(RootStoreContext);

  if (context === undefined) {
    throw new Error("useRootStore must be used within it's context provider");
  }

  return context;
}