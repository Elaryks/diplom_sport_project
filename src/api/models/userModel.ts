import { UserAmpluaType } from "../types/userAmplua";
import { UserGenderType } from "../types/userGender";

export type UserModel = {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
  amplua?: UserAmpluaType;
  gender?: UserGenderType;
  teamId?: number;
  role?: number;
  isActivated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  // refreshToken ?: string;
  // activationLink ?: string;
};
