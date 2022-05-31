/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyInvite2RoleDto } from './CompanyInvite2RoleDto';

export type CompanyInviteDto = {
    id?: number;
    companyId?: number;
    email?: string | null;
    isReusable?: boolean;
    url?: string | null;
    roles?: Array<CompanyInvite2RoleDto> | null;
    isUsed?: boolean;
    code?: string | null;
    isValid?: boolean;
}