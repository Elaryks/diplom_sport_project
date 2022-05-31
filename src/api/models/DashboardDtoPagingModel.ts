/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DashboardDto } from './DashboardDto';
import type { PagingOptions } from './PagingOptions';

export type DashboardDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<DashboardDto> | null;
}