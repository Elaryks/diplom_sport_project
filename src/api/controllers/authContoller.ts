import { AxiosError, AxiosInstance } from "axios";
import { ApiControllerBase } from "../helpers";
import { AuthenticationModel } from "../models/authenticationModel";
import { UserModel } from "../models/userModel";
import { LogoutModel } from "../models/logoutModel";

export class AuthController extends ApiControllerBase {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "auth");
  }

  public async logIn(
    model: AuthenticationModel,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<{ tokens: { accessToken: string; refreshToken: string }; user: UserModel } | null> {
    return await this.process(this.post("login", { data: model }), onSuccess, onError);
  }

  // public async refreshToken(model: RefreshTokenDto): Promise<AuthenticationResultDto | null> {
  //   return await this.process(
  //     this.post("refresh-token", { data: model }),
  //     (x) => x,
  //     () => false
  //   );
  // }

  public async signUp(
    model: UserModel,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<any | null> {
    return await this.process(this.post("signup", { data: model }), onSuccess, onError);
  }

  public async logOut(
    model: LogoutModel,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<any | null> {
    return await this.process(this.post("logout", { data: model }), onSuccess, onError);
  }

  // public async resetPasswordSendCode(model: PasswordResetRequestCommand): Promise<boolean | null> {
  //   return await this.process(
  //     this.post("password-reset", { data: model }),
  //     () => true,
  //     () => false
  //   );
  // }

  // public async resetPassword(model: PasswordResetAttemptCommand): Promise<CompanyDto | null> {
  //   return await this.process(this.put("password-reset", { data: model }));
  // }
}
