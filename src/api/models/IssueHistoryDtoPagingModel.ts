/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueHistoryDto } from './IssueHistoryDto';
import type { PagingOptions } from './PagingOptions';

export type IssueHistoryDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<IssueHistoryDto> | null;
}