import { RootStore } from "./rootStore";
import { LocalStorageHelpers } from "../helpers/localStorageHelpers";
import { makeAutoObservable } from "mobx";
import { UserModel } from "../api/models/userModel";
import { api } from "../services";

const localStorageHelpers = LocalStorageHelpers();

export class AuthStore {
  // Localstorage keys
  private lsKeys = {
    refreshToken: "refreshToken",
    accessToken: "accessToken",
    userData: "userData",
    currentUserId: "currentUserId",
    currentUserRole: "currentUserRole"
    // initialInfo: "initialInfo",
  };

  root: RootStore;
  accessToken: string | null;
  refreshToken: string | null;
  userData: UserModel | null;
  currentUserId: number | null;
  currentUserRole: number | null;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.accessToken = localStorageHelpers.get(this.lsKeys.accessToken) ?? null;
    this.refreshToken = localStorageHelpers.get(this.lsKeys.refreshToken) ?? null;
    this.userData = localStorageHelpers.get(this.lsKeys.userData) ?? null;
    this.currentUserId = localStorageHelpers.get(this.lsKeys.currentUserId) ?? null;
    this.currentUserRole = localStorageHelpers.get(this.lsKeys.currentUserRole) ?? null;
  }

  async logOut(): Promise<void> {
    const r = await api.auth.logOut({ refreshToken: this.refreshToken as string });
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setUserData(null);
    this.setCurrentUserId(null);
    this.setCurrentUserRole(null);
  }

  setRefreshToken(token: string | null): void {
    this.refreshToken = token;
    localStorageHelpers.set(this.lsKeys.refreshToken, token);
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
    localStorageHelpers.set(this.lsKeys.accessToken, token);
  }

  setUserData(userData: UserModel | null): void {
    this.userData = userData;
    localStorageHelpers.set(this.lsKeys.userData, userData);
    this.setCurrentUserId(userData?.id ?? null);
    this.setCurrentUserRole(userData?.role ?? null);
  }

  setCurrentUserId(currentUserId: number | null): void {
    this.currentUserId = currentUserId;
    localStorageHelpers.set(this.lsKeys.currentUserId, currentUserId);
  }

  setCurrentUserRole(currentUserId: number | null): void {
    this.currentUserId = currentUserId;
    localStorageHelpers.set(this.lsKeys.currentUserId, currentUserId);
  }

  get getRefreshToken(): string | null {
    return this.refreshToken;
  }

  get getAccessToken(): string | null {
    // return toJS(this.accessToken);
    return this.accessToken;
  }

  get isAuthorized(): boolean {
    return this.accessToken != null && this.refreshToken != null;
  }

  get getUserData(): UserModel | null {
    return this.userData;
  }

  get getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  get getCurrentUserRole(): number | null {
    return this.currentUserRole;
  }
}
