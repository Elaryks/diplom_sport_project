import { makeAutoObservable } from "mobx";

export class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

// To access outside of react context
export const rootStore = new RootStore();