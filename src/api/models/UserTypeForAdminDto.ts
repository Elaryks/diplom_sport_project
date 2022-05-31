/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserShortDto } from './UserShortDto';

export type UserTypeForAdminDto = {
    id?: number;
    user?: UserShortDto;
    type?: string | null;
}