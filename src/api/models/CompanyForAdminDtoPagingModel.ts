/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyForAdminDto } from './CompanyForAdminDto';
import type { PagingOptions } from './PagingOptions';

export type CompanyForAdminDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<CompanyForAdminDto> | null;
}