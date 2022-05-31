/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyDto } from './CompanyDto';
import type { PagingOptions } from './PagingOptions';

export type CompanyDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<CompanyDto> | null;
}