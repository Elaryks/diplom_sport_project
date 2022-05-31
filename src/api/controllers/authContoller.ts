import { AxiosError, AxiosInstance } from "axios";
import { ApiControllerBase } from "../helpers/apiControllerBase";
import { AuthenticationStrategyByCredentialsModel } from "../models/AuthenticationStrategyByCredentialsModel";
import { AuthenticationResultDto } from "../models/AuthenticationResultDto";
import { CompanyDto } from "../models/CompanyDto";
import { SignUpWithCompanyInviteCommand } from "../models/SignUpWithCompanyInviteCommand";
import { RefreshTokenDto } from "../models/RefreshTokenDto";
import { PasswordResetAttemptCommand } from "../models/PasswordResetAttemptCommand";
import { PasswordResetRequestCommand } from "../models/PasswordResetRequestCommand";
import { CompanyShortDto } from "../models/CompanyShortDto";
import { AuthenticationStrategyBySignInTokenModel } from "../models/AuthenticationStrategyBySignInTokenModel";

export class AuthController extends ApiControllerBase {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "authentication");
  }

  public async logIn(
    model: AuthenticationStrategyByCredentialsModel,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<AuthenticationResultDto | null> {
    return await this.process(this.post("credentials", { data: model }), onSuccess, onError);
  }

  public async logInWithToken(
    model: AuthenticationStrategyBySignInTokenModel
  ): Promise<AuthenticationResultDto | null> {
    return await this.process(this.post("sign-in-token", { data: model }));
  }

  public async refreshToken(model: RefreshTokenDto): Promise<AuthenticationResultDto | null> {
    return await this.process(
      this.post("refresh-token", { data: model }),
      (x) => x,
      () => false
    );
  }

  public async signUpWithCompanyInviteValidateCode(
    model: string,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<CompanyShortDto | null> {
    return await this.process(this.get("sign-up/company-invite/" + model), onSuccess, onError);
  }

  public async signUpWithCompanyInvite(
    model: SignUpWithCompanyInviteCommand,
    onSuccess: ((x: any) => any) | null = null,
    onError: ((y: AxiosError) => any) | null = null
  ): Promise<boolean | null> {
    return await this.process(this.post("sign-up/company-invite", { data: model }), onSuccess, onError);
  }

  public async resetPasswordSendCode(model: PasswordResetRequestCommand): Promise<boolean | null> {
    return await this.process(
      this.post("password-reset", { data: model }),
      () => true,
      () => false
    );
  }

  public async resetPassword(model: PasswordResetAttemptCommand): Promise<CompanyDto | null> {
    return await this.process(this.put("password-reset", { data: model }));
  }
}
