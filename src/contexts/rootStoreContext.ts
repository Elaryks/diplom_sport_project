import { RootStore } from "../stores/rootStore";
import { createContext } from "react";

export const RootStoreContext = createContext<RootStore>(new RootStore());