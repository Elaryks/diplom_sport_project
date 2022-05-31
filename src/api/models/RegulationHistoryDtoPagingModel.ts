/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PagingOptions } from './PagingOptions';
import type { RegulationHistoryDto } from './RegulationHistoryDto';

export type RegulationHistoryDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<RegulationHistoryDto> | null;
}