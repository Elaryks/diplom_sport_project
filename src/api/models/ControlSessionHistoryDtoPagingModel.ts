/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ControlSessionHistoryDto } from './ControlSessionHistoryDto';
import type { PagingOptions } from './PagingOptions';

export type ControlSessionHistoryDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<ControlSessionHistoryDto> | null;
}