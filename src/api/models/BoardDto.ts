/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardStatusDto } from './BoardStatusDto';
import type { CompanyDto } from './CompanyDto';

export type BoardDto = {
    id?: number;
    companyId?: number;
    company?: CompanyDto;
    schemeResetTimes?: number;
    dateUpdated?: string | null;
    name?: string | null;
    description?: string | null;
    statuses?: Array<BoardStatusDto> | null;
}