/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleShortDto } from './RoleShortDto';

export type CompanyInvite2RoleDto = {
    id?: number;
    companyInviteId?: number;
    roleId?: number;
    role?: RoleShortDto;
    user2RoleType?: string | null;
}