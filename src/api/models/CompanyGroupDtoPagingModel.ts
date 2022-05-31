/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyGroupDto } from './CompanyGroupDto';
import type { PagingOptions } from './PagingOptions';

export type CompanyGroupDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<CompanyGroupDto> | null;
}