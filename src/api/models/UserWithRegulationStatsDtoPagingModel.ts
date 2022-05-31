/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PagingOptions } from './PagingOptions';
import type { UserWithRegulationStatsDto } from './UserWithRegulationStatsDto';

export type UserWithRegulationStatsDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<UserWithRegulationStatsDto> | null;
}