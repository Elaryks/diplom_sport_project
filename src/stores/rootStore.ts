import { makeAutoObservable } from "mobx";
import { AuthStore } from "./authStore";

export class RootStore {
  authStore: AuthStore;

  constructor() {
    makeAutoObservable(this);
    this.authStore = new AuthStore(this);
  }
}

// To access outside of react context
export const rootStore = new RootStore();
