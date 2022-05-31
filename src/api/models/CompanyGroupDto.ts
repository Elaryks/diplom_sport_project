/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyForAdminDto } from './CompanyForAdminDto';
import type { UserTypeForAdminDto } from './UserTypeForAdminDto';

export type CompanyGroupDto = {
    id?: number;
    name?: string | null;
    dateCreated?: string;
    companies?: Array<CompanyForAdminDto> | null;
    userTypes?: Array<UserTypeForAdminDto> | null;
}