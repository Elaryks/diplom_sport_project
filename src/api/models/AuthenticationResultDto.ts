/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InitialInfoDto } from './InitialInfoDto';
import type { RefreshTokenDto } from './RefreshTokenDto';

export type AuthenticationResultDto = {
    initialInfo?: InitialInfoDto;
    tokenAccess?: string | null;
    refreshToken?: RefreshTokenDto;
}