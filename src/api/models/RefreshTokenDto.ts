/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RefreshTokenDto = {
    id?: number;
    token?: string | null;
    dateExpiration?: string;
    isValid?: boolean;
    userId?: number;
}