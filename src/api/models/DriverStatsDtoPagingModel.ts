/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DriverStatsDto } from './DriverStatsDto';
import type { PagingOptions } from './PagingOptions';

export type DriverStatsDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<DriverStatsDto> | null;
}