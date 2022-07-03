import { IUser } from "../IUser.interface";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}