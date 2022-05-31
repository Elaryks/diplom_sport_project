/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyShortDto } from './CompanyShortDto';

export type User2CompanyDto = {
    id?: number;
    companyId?: number;
    company?: CompanyShortDto;
    nearestAdminUserId?: number | null;
    userId?: number;
}